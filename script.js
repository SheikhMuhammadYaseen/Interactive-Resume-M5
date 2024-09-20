var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var educationInput = document.getElementById("education");
var workExperienceInput = document.getElementById("work-experience");
var skillsInput = document.getElementById("skills");
var profilePicInput = document.getElementById("profile-pic");
var displayName = document.getElementById("display-name");
var displayEmail = document.getElementById("display-email");
var displayEducation = document.getElementById("display-education");
var displayWorkExperience = document.getElementById("display-work-experience");
var displaySkills = document.getElementById("display-skills");
var displayPic = document.getElementById("display-pic");
var generateUrlButton = document.getElementById('generate-url');
var uniqueUrlInput = document.getElementById('unique-url');
var downloadPdfButton = document.getElementById('download-pdf');
var resumeElement = document.getElementById('resume');
function updateResume() {
    displayName.textContent = nameInput.value || "Your Name";
    displayEmail.textContent = emailInput.value || "Your Email";
    displayEducation.textContent = educationInput.value || "Your Education";
    displayWorkExperience.textContent = workExperienceInput.value || "Your Work Experience";
    var skills = skillsInput.value.split(',').map(function (skill) { return skill.trim(); }).filter(function (skill) { return skill; });
    displaySkills.innerHTML = '';
    skills.forEach(function (skill) {
        var li = document.createElement('li');
        li.textContent = skill;
        displaySkills.appendChild(li);
    });
}
nameInput.addEventListener('input', updateResume);
emailInput.addEventListener('input', updateResume);
educationInput.addEventListener('input', updateResume);
workExperienceInput.addEventListener('input', updateResume);
skillsInput.addEventListener('input', updateResume);
profilePicInput.addEventListener('change', function (event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            displayPic.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});
generateUrlButton.addEventListener('click', function () {
    var name = nameInput.value.trim().replace(/\s+/g, '-').toLowerCase() || "your-name";
    var baseUrl = window.location.origin;
    var uniqueUrl = "".concat(baseUrl, "/").concat(name);
    uniqueUrlInput.value = uniqueUrl;
});
downloadPdfButton.addEventListener('click', function () {
    var opt = {
        margin: 0.5,
        filename: "".concat(nameInput.value || 'resume', ".pdf"),
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(resumeElement).set(opt).save();
});
