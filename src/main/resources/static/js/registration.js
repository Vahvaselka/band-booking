let uploadedFiles = [];

// File upload handling
document.getElementById('uploadBox').addEventListener('dragover', (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
});

document.getElementById('uploadBox').addEventListener('dragleave', (e) => {
    e.currentTarget.classList.remove('dragover');
});

document.getElementById('uploadBox').addEventListener('drop', (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
});

document.getElementById('fileInput').addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

function handleFiles(files) {
    uploadedFiles = Array.from(files);
    showUploadedFiles();
}

function showUploadedFiles() {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';

    uploadedFiles.forEach(file => {
        const li = document.createElement('li');
        li.textContent = file.name;
        fileList.appendChild(li);
    });

    document.getElementById('uploadedFiles').style.display = 'block';
}

function startAnalysis() {
    // Hide step 1 content and show step 2
    document.getElementById('step1-content').classList.add('hidden');
    document.getElementById('step2-content').classList.remove('hidden');

    // Update progress steps
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.add('active');

    // Simulate analysis progress
    simulateAnalysis();
}

function simulateAnalysis() {
    let progress = 0;
    const progressBar = document.getElementById('analysisProgress');
    const status = document.getElementById('analysisStatus');

    const interval = setInterval(() => {
        progress += 5;
        progressBar.style.width = `${progress}%`;

        if (progress === 100) {
            clearInterval(interval);
            showAnalysisResults();
        }
    }, 200);
}

function showAnalysisResults() {
    // Show results and move to step 3
    setTimeout(() => {
        document.getElementById('step2-content').classList.add('hidden');
        document.getElementById('step3-content').classList.remove('hidden');
        document.getElementById('step2').classList.remove('active');
        document.getElementById('step3').classList.add('active');

        // Populate AI suggestions
        showAISuggestions();
    }, 1000);
}

function showAISuggestions() {
    const suggestions = {
        genre: 'Rock/Alternative',
        subGenres: ['Indie Rock', 'Alternative Metal'],
        similarArtists: ['Band A', 'Band B', 'Band C'],
        suggestedBio: 'A dynamic rock band blending alternative and indie influences...'
    };

    const aiSuggestions = document.getElementById('aiSuggestions');
    aiSuggestions.innerHTML = `
        <div class="suggestion-item">
            <label>Detected Genre</label>
            <p>${suggestions.genre}</p>
        </div>
        <div class="suggestion-item">
            <label>Sub-Genres</label>
            <p>${suggestions.subGenres.join(', ')}</p>
        </div>
        <div class="suggestion-item">
            <label>Similar Artists</label>
            <p>${suggestions.similarArtists.join(', ')}</p>
        </div>
        <div class="suggestion-item">
            <label>Suggested Bio</label>
            <p>${suggestions.suggestedBio}</p>
        </div>
    `;
}