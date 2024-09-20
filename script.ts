declare var html2pdf: any;

const nameInput = document.getElementById("name") as HTMLInputElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const educationInput = document.getElementById("education") as HTMLInputElement;
const workExperienceInput = document.getElementById("work-experience") as HTMLInputElement;
const skillsInput = document.getElementById("skills") as HTMLInputElement;
const profilePicInput = document.getElementById("profile-pic") as HTMLInputElement;

const displayName = document.getElementById("display-name")!;
const displayEmail = document.getElementById("display-email")!;
const displayEducation = document.getElementById("display-education")!;
const displayWorkExperience = document.getElementById("display-work-experience")!;
const displaySkills = document.getElementById("display-skills")!;
const displayPic = document.getElementById("display-pic") as HTMLImageElement;

const generateUrlButton = document.getElementById('generate-url') as HTMLButtonElement;
const uniqueUrlInput = document.getElementById('unique-url') as HTMLInputElement;

const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;
const resumeElement = document.getElementById('resume') as HTMLElement;

function updateResume() {
    displayName.textContent = nameInput.value || "Your Name";
    displayEmail.textContent = emailInput.value || "Your Email";
    displayEducation.textContent = educationInput.value || "Your Education";
    displayWorkExperience.textContent = workExperienceInput.value || "Your Work Experience";
    
    const skills = skillsInput.value.split(',').map(skill => skill.trim()).filter(skill => skill);
    displaySkills.innerHTML = ''; 
    skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        displaySkills.appendChild(li);
    });
}

nameInput.addEventListener('input', updateResume);
emailInput.addEventListener('input', updateResume);
educationInput.addEventListener('input', updateResume);
workExperienceInput.addEventListener('input', updateResume);
skillsInput.addEventListener('input', updateResume);

profilePicInput.addEventListener('change', function(event) {
    const file = (event.target as HTMLInputElement).files![0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            displayPic.src = e.target!.result as string;
        }
        reader.readAsDataURL(file);
    }
});

generateUrlButton.addEventListener('click', () => {
    const name = nameInput.value.trim().replace(/\s+/g, '-').toLowerCase() || "your-name";
    const baseUrl = window.location.origin; 
    const uniqueUrl = `${baseUrl}/${name}`;
    uniqueUrlInput.value = uniqueUrl;
});

downloadPdfButton.addEventListener('click', () => {
    const opt = {
        margin:       0.5,
        filename:     `${nameInput.value || 'resume'}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(resumeElement).set(opt).save();
});
