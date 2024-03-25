const handleScanFace = (setCapturedImage) => {
  // Create parent container for video and button
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';

  // Create video element
  const video = document.createElement('video');
  // Create canvas element
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // Function to stop video stream
  const stopStream = (stream) => {
    stream.getTracks().forEach(track => track.stop());
  };

  // Start capturing video from camera
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      video.play();
    })
    .catch(err => {
      console.error('Error accessing camera:', err);
      alert('Error accessing camera. Please check your camera permissions.');
    });

  // Create 'Scan Face' button
  const scanFaceBtn = document.createElement('button');
  scanFaceBtn.textContent = 'Scan Face';

  // Add event listener to capture image when button is clicked
  const captureImage = () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataURL = canvas.toDataURL('image/jpeg');
    setCapturedImage(imageDataURL); // Set captured image to state
    stopStream(video.srcObject); // Stop video stream
    // Remove the container from the DOM
    document.body.removeChild(container);
    // Remove event listener after button is clicked
    scanFaceBtn.removeEventListener('click', captureImage);
  };

  scanFaceBtn.addEventListener('click', captureImage);

  // Append video and button elements to the parent container
  container.appendChild(video);
  container.appendChild(scanFaceBtn);
  // Append the parent container to the body
  document.body.appendChild(container);
};

export default handleScanFace;