
document.addEventListener('DOMContentLoaded', () => {
    initializeFormHandlers();
    hideAllStepsExceptFirst();
});

function hideAllStepsExceptFirst() {
    // Hide all steps except the first one
    const steps = document.querySelectorAll('.step-content');
    steps.forEach((step, index) => {
        if (index === 0) {
            step.classList.remove('hidden');
        } else {
            step.classList.add('hidden');
        }
    });
}

function initializeFormHandlers() {
    // Upload box handlers
    const uploadBox = document.getElementById('uploadBox');
    const fileInput = document.getElementById('fileInput');
    const browseButton = document.getElementById('browseButton');

    uploadBox.addEventListener('dragover', handleDragOver);
    uploadBox.addEventListener('dragleave', handleDragLeave);
    uploadBox.addEventListener('drop', handleDrop);
    fileInput.addEventListener('change', handleFileSelect);
    browseButton.addEventListener('click', () => fileInput.click());

    // Navigation buttons
    document.getElementById('proceedToAnalysisBtn').addEventListener('click', () => {
        hideStep(1);
        showStep(2);
        startAnalysis();
    });

    document.getElementById('backToUploadBtn').addEventListener('click', () => {
        hideStep(2);
        showStep(1);
    });

    document.getElementById('analysisDoneBtn').addEventListener('click', () => {
        hideStep(2);
        showStep(3);
    });

    document.getElementById('backToAnalysisBtn').addEventListener('click', () => {
        hideStep(3);
        showStep(2);
    });

    document.getElementById('submitProfileBtn').addEventListener('click', handleProfileSubmission);
}

function hideStep(stepNumber) {
    document.getElementById(`step${stepNumber}-content`).classList.add('hidden');
    document.getElementById(`step${stepNumber}`).classList.remove('active');
}

function showStep(stepNumber) {
    document.getElementById(`step${stepNumber}-content`).classList.remove('hidden');
    document.getElementById(`step${stepNumber}`).classList.add('active');
    updateProgress(stepNumber);
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
}

function handleDragLeave(e) {
    e.currentTarget.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
}

function handleFileSelect(e) {
    handleFiles(e.target.files);
}

function handleFiles(files) {
    if (files.length > 5) {
        showError('Maximum 5 files allowed');
        return;
    }

    if (!validateFiles(files)) {
        return;
    }

    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';

    Array.from(files).forEach(file => {
        const li = document.createElement('li');
        li.textContent = file.name;
        fileList.appendChild(li);
    });

    document.getElementById('uploadedFiles').style.display = 'block';
    document.getElementById('proceedToAnalysisBtn').disabled = false;
}

function startAnalysis() {
    const progressBar = document.getElementById('analysisProgress');
    const statusText = document.getElementById('analysisStatus');
    const nextButton = document.getElementById('analysisDoneBtn');
    let progress = 0;

    nextButton.disabled = true;
    progressBar.style.width = '0%';

    const interval = setInterval(() => {
        progress += 2;
        progressBar.style.width = `${progress}%`;

        updateAnalysisStatus(getAnalysisStatusText(progress));

        if (progress >= 100) {
            clearInterval(interval);
            statusText.textContent = 'Analysis Complete!';
            nextButton.disabled = false;
        }
    }, 100);
}

function getAnalysisStatusText(progress) {
    if (progress < 25) return 'Analyzing musical style and genre...';
    if (progress < 50) return 'Detecting instruments and arrangements...';
    if (progress < 75) return 'Identifying similar artists...';
    if (progress < 90) return 'Generating venue recommendations...';
    return 'Finalizing analysis...';
}

function updateAnalysisStatus(status) {
    const statusElement = document.getElementById('analysisStatus');
    statusElement.textContent = status;
}

function validateFiles(files) {
    const validTypes = ['audio/mpeg', 'audio/wav'];
    const maxSize = 20 * 1024 * 1024; // 20MB

    for (let file of files) {
        if (!validTypes.includes(file.type)) {
            showError(`Invalid file type: ${file.name}. Please upload only MP3 or WAV files.`);
            return false;
        }
        if (file.size > maxSize) {
            showError(`File too large: ${file.name}. Maximum size is 20MB.`);
            return false;
        }
    }
    return true;
}

function updateProgress(step) {
    const steps = document.querySelectorAll('.step');
    steps.forEach((stepElement, index) => {
        if (index < step) {
            stepElement.classList.add('completed');
        } else {
            stepElement.classList.remove('completed');
        }
    });
}

function handleProfileSubmission() {
    const profileData = {
        ensembleName: document.getElementById('ensembleName').value,
        location: document.getElementById('location').value,
        rate: document.getElementById('rate').value,
        duration: document.getElementById('duration').value
    };

    if (!validateProfileData(profileData)) {
        return;
    }

    // skicka data till server to do
    alert('Profile created successfully!');
    // Redirect to dashboard or home page
    window.location.href = '/index.html';
}

function validateProfileData(data) {
    if (!data.ensembleName || !data.location || !data.rate || !data.duration) {
        showError('Please fill in all profile fields');
        return false;
    }
    return true;
}

function showError(message) {
    alert(message);
}
