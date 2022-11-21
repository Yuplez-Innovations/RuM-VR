import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { uploadFiles, getEachFolder, fetchFile } from '../axios/folder.axios';

import Navbar from '../components/Navbar.component';
import { BASE_URL } from '../utils/constants.util';

const EachFolder = () => {
	const { id_folder } = useParams();
	const { user } = useSelector((state) => ({ ...state }));

	const [isUploadFilesOpened, setIsUploadFilesOpened] = useState(false);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [folderData, setFolderData] = useState({});
	const [folderInfo, setFolderInfo] = useState({});

	const fetchEachFolder = async () => {
		await getEachFolder(id_folder)
			.then((res) => {
				console.log(res.data);
				setFolderInfo(res.data);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		fetchEachFolder();
	}, [fetchEachFolder]);

	const handleFileUpload = async (e) => {
		e.preventDefault();
		var formData = new FormData();
		formData.append('name', folderInfo.name);
		for (const key of Object.keys(selectedFiles)) {
			formData.append('files', selectedFiles[key]);
		}
		await uploadFiles(formData)
			.then((res) => {
				setIsUploadFilesOpened(false);
				fetchEachFolder();
			})
			.catch((err) => {
				console.log(err);
				setIsUploadFilesOpened(false);
			});
	};

	return (
		<div className='w-screen flex items-center flex-col bg-[#eeeeef] min-h-screen'>
			<Navbar />
			<div className='max-w-5xl w-full px-6'>
				<div className='flex items-center justify-between mt-3 px-3'>
					<h1 className='font-semibold text-4xl'>Files</h1>
					{user.role === 'admin' && (
						<button
							className='bg-[#285fdd] text-white p-2 rounded shadow-lg my-3'
							onClick={() => setIsUploadFilesOpened(!isUploadFilesOpened)}
						>
							UPLOAD
						</button>
					)}
				</div>
				<div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'>
					{folderInfo &&
						folderInfo.files &&
						folderInfo.files.map((file, index) => {
							return (
								<div
									key={index}
									className='bg-white p-3 inline-block m-3 h-24 shadow-lg rounded cursor-pointer'
									onClick={()=>window.open(`${BASE_URL}/folder/fetch/${folderInfo.name}/${file}`,'_blank')}
								>
									{file}
								</div>
							);
						})}
				</div>
				{isUploadFilesOpened && (
					<div
						className='w-screen h-full absolute z-10 top-0 left-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center'
						onClick={() => setIsUploadFilesOpened(false)}
					>
						<div
							className='bg-[#eeeeef] p-9 rounded'
							onClick={(e) => e.stopPropagation()}
						>
							<form onSubmit={(e) => handleFileUpload(e)}>
								<input
									className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
									type='file'
									multiple
									onChange={(e) => setSelectedFiles(e.target.files)}
									accept='video/*'
								/>

								<button
									className='bg-[#285fdd] text-white p-2 rounded shadow-lg my-2 w-full'
									// onClick={() =>
									// }
								>
									UPLOAD FILES
								</button>
							</form>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default EachFolder;
