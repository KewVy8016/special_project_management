// Filter and Search functionality
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const projectCards = document.querySelectorAll('.project-card');

// Modal Elements
const reviewModal = document.getElementById('reviewModal');
const modalTitle = document.getElementById('modalTitle');
const projectDetails = document.getElementById('projectDetails');
const proposalReview = document.getElementById('proposalReview');
const finalReview = document.getElementById('finalReview');

// Phase Filter Elements
const examPhaseSelector = document.getElementById('examPhaseSelector');
const examPhaseButtons = document.querySelectorAll('.exam-phase-btn');

// Professor List (สำหรับอ้างอิงและใช้งานในระบบ)
const professorNames = [
    "รศ.ดร.อนิราช มิ่งขวัญ",
    "ผศ.อรบุษป์ วุฒิกมลชัย",
    "ผศ.ดร.บีสุดา ดาวเรือง",
    "ผศ.ดร.ขนิษฐา นามี",
    "อ.ดร.กาญจน ณ ศรีธะ",
    "ผศ.นพดล บูรณ์กุศล",
    "ผศ.จสต.นพเก้า ทองใบ",
    "ผศ.ดร.นิติการ นาคเจือทอง",
    "ผศ.ดร.นัฎฐพันธ์ นาคพงษ์",
    "ผศ.นิมิต ศรีคำทา",
    "อ.ดร.พิทย์พิมล ชูรอด",
    "ผศ.ดร.พาฝัน ดวงไพศาล",
    "อ.ดร.ประดิษฐ์ พิทักษ์เสถียรกุล",
    "ผศ.พีระศักดิ์ เสรีกุล",
    "ผศ.สมชัย เชียงพงศ์พันธุ์",
    "ผศ.ดร.สุปีติ กุลจันทร์",
    "ผศ.สิวาลัย จินเจือ",
    "ผศ.ดร.สุพาภรณ์ ซิ้มเจริญ",
    "ผศ.ดร.ศรายุทธ ธเนศสกุลวัฒนา",
    "อ.ดร.ศิรินทรา แว่วศรี",
    "อ.ดร.วัชรชัย คงศิริวัฒนา",
    "ผศ.ดร.วันทนี ประจวบศุภกิจ",
    "รศ.ดร.ยุพิน สรรพคุณ"
];

function filterProjects() {
    const searchTerm = searchInput.value.toLowerCase();
    const statusValue = statusFilter.value; 
    
    // Get active exam phase from the button
    const activePhaseButton = document.querySelector('.exam-phase-btn.active');
    const examPhaseValue = activePhaseButton ? activePhaseButton.dataset.phase : 'all'; 

    projectCards.forEach(card => {
        const title = card.querySelector('.project-title').textContent.toLowerCase();
        const members = Array.from(card.querySelectorAll('.member-tag'))
            .map(tag => tag.textContent.toLowerCase()).join(' ');
        const cardText = card.textContent.toLowerCase(); 
        
        // 1. Check search term
        const matchesSearch = searchTerm === '' || 
            title.includes(searchTerm) || 
            members.includes(searchTerm) || 
            cardText.includes(searchTerm); 
        
        // 2. Check status filter
        const cardStatus = card.dataset.status;
        const matchesStatus = statusValue === 'all' || cardStatus === statusValue;
        
        // 3. Check exam phase
        const cardExamPhase = card.dataset.examPhase;
        const matchesExamPhase = examPhaseValue === 'all' || cardExamPhase === examPhaseValue;

        if (matchesSearch && matchesStatus && matchesExamPhase) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Helper function: Convert status key to Thai text
function getThaiStatus(status) {
    switch (status) {
        case 'pending_review': return 'รอตรวจ';
        case 'needs_revision': return 'รอการแก้ไข';
        case 'pending_exam': return 'รอสอบ';
        case 'passed': return 'ผ่าน';
        default: return status;
    }
}

// Function to open the review modal
function openReviewModal(buttonElement) {
    if (!reviewModal) {
        alert("Error: Review Modal element not found. Please ensure the content of 'review-modal.html' is included in your main HTML file.");
        return;
    }

    const card = buttonElement.closest('.project-card');
    const projectTitle = card.dataset.projectTitle;
    const examPhase = card.dataset.examPhase;
    const advisor = card.dataset.advisor;
    const tech = card.dataset.tech;
    const projectStatus = card.dataset.status;

    // 1. Set Modal Title
    modalTitle.textContent = `พิจารณาโครงงาน: ${projectTitle}`;
    
    // 2. Prepare Project Details HTML
    let detailsHtml = `
        <p><strong>หัวข้อ:</strong> ${projectTitle}</p>
        <p><strong>อาจารย์ที่ปรึกษา:</strong> ${advisor}</p>
        <p><strong>เทคโนโลยี:</strong> ${tech}</p>
        <p><strong>ประเภทการสอบ:</strong> ${examPhase === 'proposal' ? 'สอบเสนอหัวข้อ' : 'สอบจบโครงงาน'}</p>
    `;

    // 3. Status-based Review Logic: 
    // MODIFIED: ตรวจสอบว่าสถานะปัจจุบันคือ 'pending_exam' (รอสอบ) หรือ 'pending_review' (รอตรวจ)
    const isReviewActive = projectStatus === 'pending_exam' || projectStatus === 'pending_review';

    // ซ่อนส่วนฟอร์มและปุ่มส่งผลการพิจารณาทั้งหมดเป็นค่าเริ่มต้น
    proposalReview.style.display = 'none';
    finalReview.style.display = 'none';
    const submitBtn = document.getElementById('submitReviewBtn');
    submitBtn.style.display = 'none'; 
    
    // ลบส่วนการสร้าง/แสดง statusMessageElement ทั้งหมดออก

    if (isReviewActive) { 
        // A. ถ้าสถานะเป็น 'รอสอบ' หรือ 'รอตรวจ': แสดงฟอร์มที่เกี่ยวข้อง
        if (examPhase === 'proposal') {
            proposalReview.style.display = 'block';
            // Update document link (mock link)
            const proposalDocLink = document.getElementById('proposalDocLink');
            proposalDocLink.href = `/documents/proposal/${projectTitle}.pdf`;
            proposalDocLink.querySelector('i').nextSibling.textContent = ` ดาวน์โหลดเอกสารเสนอหัวข้อ`;

        } else if (examPhase === 'final') {
            finalReview.style.display = 'block';
            // Update document links (mock links)
            document.getElementById('finalDocLink').href = `/documents/final/${projectTitle}_report.docx`;
            document.getElementById('slideLink').href = `/documents/final/${projectTitle}_slide.pptx`;
        }
        submitBtn.style.display = 'block'; // แสดงปุ่มส่งผลการพิจารณา
    }
    
    // 4. Inject all project details 
    projectDetails.innerHTML = detailsHtml;

    // 5. Display the Modal
    reviewModal.style.display = 'block';
}

// Function to close the review modal
function closeReviewModal() {
    reviewModal.style.display = 'none';
}

// Function to handle mock review submission
const submitReviewBtn = document.getElementById('submitReviewBtn');
if (submitReviewBtn) {
    submitReviewBtn.addEventListener('click', function() {
        alert('ผลการพิจารณาถูกบันทึกและส่งแล้ว! (Mock Submission)');
        closeReviewModal();
    });
}


// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == reviewModal) {
        closeReviewModal();
    }
}

// Event listeners for the Exam Phase Buttons
examPhaseButtons.forEach(button => {
    button.addEventListener('click', function() {
        examPhaseButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        filterProjects();
    });
});


// Load more projects function
function loadMoreProjects() {
    alert('กำลังโหลดโครงงานเพิ่มเติม... (ในระบบจริงจะโหลดข้อมูลจากฐานข้อมูล)');
}

// Function to initialize page
function initializePage() {
    // Event listeners for existing filters
    searchInput.addEventListener('input', filterProjects);
    statusFilter.addEventListener('change', filterProjects);

    // Initial filter call
    filterProjects(); 
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializePage);