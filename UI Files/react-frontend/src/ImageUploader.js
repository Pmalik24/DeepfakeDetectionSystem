// import React, { useState } from 'react';
// import axios from 'axios';
// import { Box, Button, Typography, Paper, CircularProgress, TextField } from '@mui/material';
// import UploadFileIcon from '@mui/icons-material/UploadFile';

// const ImageUploader = () => {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [result, setResult] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleFileChange = (e) => {
//         setSelectedFile(e.target.files[0]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!selectedFile) return;
//         setLoading(true);

//         const formData = new FormData();
//         formData.append('image', selectedFile);

//         try {
//             const response = await axios.post('http://127.0.0.1:5000/classify', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             setResult(response.data.result);
//         } catch (error) {
//             console.error('Error uploading image:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
//             <Typography variant="h5" gutterBottom>
//                 Deepfake Detection
//             </Typography>

//             <Box
//                 component="form"
//                 onSubmit={handleSubmit}
//                 sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
//             >
//                 <Button
//                     variant="contained"
//                     component="label"
//                     startIcon={<UploadFileIcon />}
//                 >
//                     Upload Image
//                     <input
//                         type="file"
//                         hidden
//                         accept="image/*"
//                         onChange={handleFileChange}
//                     />
//                 </Button>

//                 {selectedFile && (
//                     <Typography variant="subtitle1">
//                         Selected file: {selectedFile.name}
//                     </Typography>
//                 )}

//                 <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     disabled={loading || !selectedFile}
//                 >
//                     {loading ? <CircularProgress size={24} /> : 'Classify Image'}
//                 </Button>
//             </Box>

//             {result && (
//                 <Box mt={2}>
//                     <Typography variant="h6">Classification Result:</Typography>
//                     <Typography variant="body1">{result}</Typography>
//                 </Box>
//             )}
//         </Paper>
//     );
// };

// export default ImageUploader;


// ##########################################################################################################################

// import React, { useState } from 'react';
// import axios from 'axios';
// import {
//     Box,
//     Button,
//     Typography,
//     Paper,
//     CircularProgress,
//     MenuItem,
//     Select,
//     FormControl,
//     InputLabel,
// } from '@mui/material';
// import UploadFileIcon from '@mui/icons-material/UploadFile';

// const ImageUploader = () => {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [selectedModel, setSelectedModel] = useState('');
//     const [result, setResult] = useState('');
//     const [loading, setLoading] = useState(false);

//     // List of models to choose from
//     const modelOptions = [
//         { value: 'model1', label: 'Visual Transformer Model' },
//         { value: 'model2', label: 'CNN Model' },
//         { value: 'model3', label: 'SWIN Transformer Model' },
//     ];

//     const handleFileChange = (e) => {
//         setSelectedFile(e.target.files[0]);
//     };

//     const handleModelChange = (e) => {
//         setSelectedModel(e.target.value);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!selectedFile || !selectedModel) return;
//         setLoading(true);

//         const formData = new FormData();
//         formData.append('image', selectedFile);
//         formData.append('model', selectedModel);

//         try {
//             const response = await axios.post('http://127.0.0.1:5000/classify', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             setResult(response.data.result);
//         } catch (error) {
//             console.error('Error uploading image:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
//             <Typography variant="h5" gutterBottom>
//                 Deepfake Detection
//             </Typography>

//             <Box
//                 component="form"
//                 onSubmit={handleSubmit}
//                 sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
//             >
//                 {/* Dropdown for model selection */}
//                 <FormControl fullWidth>
//                     <InputLabel id="model-select-label">Select Model</InputLabel>
//                     <Select
//                         labelId="model-select-label"
//                         value={selectedModel}
//                         onChange={handleModelChange}
//                     >
//                         {modelOptions.map((model) => (
//                             <MenuItem key={model.value} value={model.value}>
//                                 {model.label}
//                             </MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>

//                 {/* File Upload Button */}
//                 <Button
//                     variant="contained"
//                     component="label"
//                     startIcon={<UploadFileIcon />}
//                 >
//                     Upload Image
//                     <input
//                         type="file"
//                         hidden
//                         accept="image/*"
//                         onChange={handleFileChange}
//                     />
//                 </Button>

//                 {selectedFile && (
//                     <Typography variant="subtitle1">
//                         Selected file: {selectedFile.name}
//                     </Typography>
//                 )}

//                 {/* Submit Button */}
//                 <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     disabled={loading || !selectedFile || !selectedModel}
//                 >
//                     {loading ? <CircularProgress size={24} /> : 'Classify Image'}
//                 </Button>
//             </Box>

//             {/* Classification Result */}
//             {result && (
//                 <Box mt={2}>
//                     <Typography variant="h6">Classification Result:</Typography>
//                     <Typography variant="body1">{result}</Typography>
//                 </Box>
//             )}
//         </Paper>
//     );
// };

// export default ImageUploader;


import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { getImageSize } from 'react-image-size';
// import Stack from '@mui/material/Stack';
import {
    Box,
    Typography,
    Paper,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Stack,
    CircularProgress,
    Card,
    CardMedia,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const ImageUploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [selectedModel, setSelectedModel] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [textColor, setTextColor] = useState('');
    // const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

    const modelOptions = [
        { value: 'model1', label: 'CNN Model' },
        { value: 'model2', label: 'Vision Transformer Model' },
        { value: 'model3', label: 'SWIN Transformer Model' },
    ];


    const handleFileChange = (e) => {
        // const { naturalHeight, naturalWidth } = URL.createObjectURL(e.target.files[0]);
        // console.log(naturalHeight)
        // getImageSize(URL.createObjectURL(e.target.files[0])).then(function(data){ 
        //     const items = data;
        //     console.log(items)
        //     console.log(items.height)
        //     // if(data.height>data.width){console.log(data.height)
        //         setDimensions({ height: items.height, width: items.width })
        //         console.log(dimensions)
            // }
            // else{console.log(data.width)
            //     setDimensions({ height: 100, width: 75 })
            // }
            // })
        // setDimensions(getImageSize(URL.createObjectURL(e.target.files[0])));
        // console.log(dimensions.PromiseResult)

        setImageFile(URL.createObjectURL(e.target.files[0]));
        setSelectedFile(e.target.files[0]);
    };

    const handleModelChange = (e) => {
        setSelectedModel(e.target.value);
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (!selectedFile || !selectedModel) return;
    //     setLoading(true);

    //     // Simulate upload and prediction
    //     setTimeout(() => {
    //         alert(`File: ${selectedFile.name}\nModel: ${selectedModel}`);
    //         setLoading(false);
    //     }, 2000);
    // };
    const handleSubmit = async (e) => {
                e.preventDefault();
                if (!selectedFile || !selectedModel) return;
                setLoading(true);
        
                const formData = new FormData();
                formData.append('image', selectedFile);
                formData.append('model', selectedModel);
        
                try {
                    const response = await axios.post('http://127.0.0.1:5000/classify', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    });
                    if(response.data.result=="Real"){
                        console.log("Real")
                        setTextColor('#7fff00')
                        console.log(textColor)}
                    else{setTextColor('#fff')
                        console.log(textColor)
                    }
                    setResult(response.data.result);
                } catch (error) {
                    console.error('Error uploading image:', error);
                } finally {
                    setLoading(false);
                }
            };

    return (
        <Stack direction="row" spacing={10} style = {{display: 'flex',
            justifyContent: 'center',
            alignItems: 'right',
            // minHeight: '100vh',
            minWidth: '150vh',
            background: 'linear-gradient(to right, #1e293b, #10172a)',
            color: '#fff',
            paddingTop: '2vh',
            paddingBottom: '2vh',
            paddingLeft: '20px',
            paddingRight: '20px',
            }}>        
        
        {/* <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'right',
                minHeight: '100vh',
                minWidth: '150vh',
                background: 'linear-gradient(to right, #1e293b, #10172a)',
                color: '#fff',
                paddingTop: '20px',
                paddingBottom: '20px',
                paddingLeft: '20px',
                paddingRight: '20px',
                justifyContent : 'space-between'
            }}
        > */}
            
                <Paper
                elevation={3}
                sx={{
                    // padding: 4,
                    width: '800px',
                    height: '96vh',
                    background: '#1f2937',
                    borderRadius: 10,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                }}
            >
                {/* {imageFile ? (
                    <Card sx={{ height: '100%' }}>
                        <CardMedia
                            component="img"
                            image={imageFile}
                            alt="Uploaded Preview"
                            sx={{
                                height: '100%',
                                objectFit: 'cover', // Crop and maintain aspect ratio
                            }}
                        />
                    </Card>
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            background: '#1f2937',
                            color: '#9ca3af',
                        }}
                    >
                        <Typography>No image uploaded</Typography>
                    </Box>
                )} */}
                {imageFile ? (
                             <img src={imageFile} style={{borderRadius: 30,display: 'flex',width:'100%',height:'100%'
                                // justifyContent: 'center',
                                // alignItems: 'center',
                                // height: `${dimensions.height}`,
                                // width: `${dimensions.width}`
                                }} />
                ):(
                            <Typography variant="h3"
                            
                            sx={{
                                textAlign: 'center',
                                paddingTop: '50%',
                                // marginBottom: 2,
                                // fontWeight: 'bold',
                                color: '#ffffff',
                            }}>Upload an Image to Begin</Typography>
                )}
                
            </Paper>

            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    minWidth: '500px',
                    maxHeight: '98vh',
                    background: '#1f2937',
                    borderRadius: 4,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        textAlign: 'center',
                        marginBottom: 5,
                        fontWeight: 'bold',
                        color: '#ffffff',
                    }}
                >
                    Deepfake Detector
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                    }}
                >
                    {/* Model Selection */}
                    <FormControl fullWidth>
                        <InputLabel id="model-select-label" sx={{ color: '#ffffff' , fontSize:20}}>
                            Select Model
                        </InputLabel>
                        <Select
                            labelId="model-select-label"
                            value={selectedModel}
                            onChange={handleModelChange}
                            sx={{
                                color: '#fff',
                                backgroundColor: '#2d3748',
                                borderRadius: 2,
                                '& .MuiSelect-icon': {
                                    color: '#fff',
                                },
                            }}
                        >
                            {modelOptions.map((model) => (
                                <MenuItem
                                    key={model.value}
                                    value={model.value}
                                    sx={{ color: '#000' }}
                                >
                                    {model.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* File Upload */}
                    <Button
                        variant="contained"
                        component="label"
                        startIcon={<UploadFileIcon />}
                        sx={{
                            backgroundColor: '#4f46e5',
                            color: '#fff',
                            padding: '10px',
                            fontSize: 20,
                            borderRadius: '8px',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#4338ca',
                            },
                        }}
                    >
                        Upload Image
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </Button>

                    {/* File Name Display */}
                    {selectedFile && (
                        <Typography variant="subtitle2" sx={{ color: '#a1a1aa' }}>
                            Selected file: {selectedFile.name}
                        </Typography>
                    )}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading || !selectedFile || !selectedModel}
                        sx={{
                            backgroundColor: '#22c55e',
                            color: '#fff',
                            padding: '10px',
                            fontSize: 20,
                            borderRadius: '8px',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#16a34a',
                            },
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Classify'}
                    </Button>
                    {/* {result=="Real" ? (
                        <Box mt={2} >
                              <Typography variant="h6" sx={{ color: '#fff' ,textAlign: 'center' }}>The Image is: </Typography>
                              <Typography variant="h1" sx={{ color:'#22c55e',fontWeight: 'bold', textAlign: 'center', paddingTop: '10%'}}>{result}</Typography>
                        </Box>
                               ):(
                                <Box mt={2}>
                                <Typography variant="h6" sx={{ color: '#fff' }}>Classification Result:</Typography>
                                <Typography variant="h1" sx={{ color:'#ff0000',fontWeight: 'bold', textAlign: 'center', paddingTop: '10%'}}>{result}</Typography>
                          </Box>
                               )} */}
                    {result &&    
                        result=="Real" ? (
                        <Box mt={2} >
                              <Typography variant="h6" sx={{ color: '#fff' ,textAlign: 'center' }}>The Image is: </Typography>
                              <Typography variant="h1" sx={{ color:'#22c55e',fontWeight: 'bold', textAlign: 'center', paddingTop: '10%'}}>{result}</Typography>
                        </Box>
                               ):(
                                <Box mt={2}>
                                <Typography variant="h6" sx={{ color: '#fff' ,textAlign: 'center' }}>The Image is: </Typography>
                                <Typography variant="h1" sx={{ color:'#ff0000',fontWeight: 'bold', textAlign: 'center', paddingTop: '10%'}}>{result}</Typography>
                          </Box>
                               )}
                    

                </Box>
            </Paper>

        {/* </Box> */}
        </Stack>
    );
};

export default ImageUploader;
