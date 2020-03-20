import React from 'react';
import { 
    Stitch, 
    AnonymousCredential 
        } from 'mongodb-stitch-browser-sdk'
import FileInput from './fileInput'
import {
    AwsServiceClient,
    AwsRequest
        } from 'mongodb-stitch-browser-services-aws';
import { RemoteMongoClient } from 'mongodb-stitch-browser-services-mongodb-remote'


const convertImageToBSONBinaryObject = file => {
    return new Promise(resolve => {
        var fileReader = new FileReader();
        fileReader.onload = event => {
            resolve({
                $binary: {
                    base64: event.target.result.split(",")[1],
                    subType: "00"
                }
            });
        }
        fileReader.readAsDataURL(file);
    })
}

class StitchApp extends React.Component {
    constructor(props) {
        super(props)
        this.appId = props.appId
        this.client = Stitch.initializeDefaultAppClient(this.appId);
        this.aws = this.client.getServiceClient(AwsServiceClient.factory, 'AWS')
        this.handleFileUpload = this.handleFileUpload.bind(this)
        this.mongodb = this.client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
        this.theUser = this.props.user

        const isAuthed = this.client.auth.loginWithCredential(new AnonymousCredential())

        this.state = {
            isAuthed
        }
    }


    handleFileUpload(file) {
        if (!file) {
            return
        }

        const memes = this.mongodb.db('memeDB').collection('memes')
        const key = `${this.theUser.id}-${file.name}`
        const bucket = 'mongo-meme-maker-dev'
        const url = `http://${bucket}.s3.amazonaws.com/${encodeURIComponent(key)}`

        convertImageToBSONBinaryObject(file)
            .then(result => {
                // AWS S3 Request
                const args = {
                    ACL: 'public-read',
                    Bucket: bucket,
                    ContentType: file.type,
                    Key: key,
                    Body: result
                }

                const request = new AwsRequest.Builder()
                    .withService("s3")
                    .withAction("PutObject")
                    .withRegion("us-west-1")
                    .withArgs(args)

                this.aws.execute(request.build()).then(result => {

                    return memes.insertOne({
                        // owner_id: this.client.auth.user.id,
                        author_id: this.theUser.id,
                        username: this.theUser.username,
                        url,
                        file: {
                            name: file.name,
                            type: file.type
                        },
                        ETag: result.ETag,
                        ts: new Date()
                    })
                })
                    .then(result => {
                        console.log(result)
                        console.log(`the URL: - ${url}`)
                        // Update UI
                        // this.getEntries()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
    }


    componentDidMount() {
        if (this.client.auth.hasRedirectResult()) {
            this.client.auth.handleRedirectResult().then(user => {
                this.setState({ isAuthed: this.client.auth.isLoggedIn })
            })
        }
    }

    render() {
        const { isAuthed } = this.state;
        const loginInfo = isAuthed ?
            (<div>
                <h2>you AUTHED</h2>
                <FileInput handleFileUpload={this.handleFileUpload} />
            </div>) :
            (<div>you NOT Authed</div>)
        return (
            <div className="App">
                hello
                {loginInfo}
            </div>
        )
    }
}

export default StitchApp;
