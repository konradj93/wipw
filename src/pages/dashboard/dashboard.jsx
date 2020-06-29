import React, {useRef, useState} from 'react';
import AWS from 'aws-sdk/global';
import {authCfg, defaultRegion, myBucket, apiUrl} from '../../env'


import './dashboard.scss';

import S3 from "aws-sdk/clients/s3";
import {AuthorizationService} from "../../lib/security/authorization.service";

AWS.config.region = defaultRegion;
const auth = new AuthorizationService(authCfg, AWS.config);


const uploadToS3 = (file) => {
	const userId = AWS.config.credentials.identityId;
	const params = {
		Body: file,
		Bucket: myBucket,
		Key: `uek-krakow/${userId}/photos/${file.name}`
	}

	return new Promise((res, fail) => {
		const s3 = new S3();
		s3.putObject(params, (err, data) => {
			if (err) {
				fail(err);
			}

			res(params.Key);
		})
	})
}

const getSignedURL = (key) => {
	const s3 = new S3();
	const params = {Bucket: myBucket, Key: key};
	return s3.getSignedUrl('getObject', params);
}

const orderAnimation = (photos) => {
	return auth.getAccessToken()
		.then(token => {
			console.log(token);
			return fetch(`${apiUrl}/animations-orders`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': token
				},
				body: JSON.stringify({"photos": photos, "meta1": "meta_value"})
			})
		})
}

const Confirm = _ =>{
	const [wentWrong, setWentWrong] = useState(null);
	const [fileName, setFileName] = useState('Choose File');
	const [files, setFiles] = useState(null);
	const fileRef = useRef();
	const showFiles = () => {
		const s3 = new S3();
		const params = {
			Bucket: myBucket,
			MaxKeys: 100
		}

		s3.listObjects(params, (err, data) => {
			if (err) {
				console.log(err);
				setWentWrong('something went wrong')
			}
			setFiles(data);
			console.log(data);
		})
	}

	const uploadFile = () => {
		const toBeUploadeFiles = [...fileRef.current.files]
		toBeUploadeFiles.forEach((file, i) => {
			uploadToS3(file)
				.then(res => getSignedURL(res))
				.catch(err => console.log(err))
				.finally(() => {fileRef.value = ""; setFileName("Choose File")})
		})
	}

	const orderAnimationFromS = () => {
		orderAnimation()
			.then(res => {
				console.log('Hurra it works')
				console.log(res)
			})
			.catch(e => console.log(e))
	}

	const showFileName = () => {
		fileRef.current.files && fileRef.current.files.length > 0 && setFileName(fileRef.current.files[0].name);
	}




	return <div className="loginPage">
		<div className="container h-100">
			<div className="row h-100 align-items-center justify-content-center">
				<div className="col-md-8">
					<div className="loginFormWrapper">
						<div className="file-wrapper">
							<button className="btn btn-primary" onClick={showFiles}> Show files from bucket</button>
							{files && <ul>
								files.map(el => <li>el</li>
							</ul>}
						</div>
						<div className="input-group mb-3">
							<div className="input-group-prepend" onClick={uploadFile}>
								<span className="input-group-text">Upload</span>
							</div>
							<div className="custom-file">
								<input type="file" className="custom-file-input" id="inputGroupFile01" onChange={showFileName} ref={fileRef}/>
									<label className="custom-file-label" htmlFor="inputGroupFile01">
										{fileName}
									</label>
							</div>
						</div>

						<div className="orderAnimation">
							<button className="btn btn-primary" onClick={orderAnimationFromS}>Order Animation</button>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>


};


export default Confirm;
