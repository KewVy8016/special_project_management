document.addEventListener("DOMContentLoaded", function () {
  const setupFileUpload = (dropArea, input, fileListContainer, fileType) => {
    dropArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropArea.classList.add("hover");
    });

    dropArea.addEventListener("dragleave", () => {
      dropArea.classList.remove("hover");
    });

    dropArea.addEventListener("drop", (e) => {
      e.preventDefault();
      dropArea.classList.remove("hover");
      const files = e.dataTransfer.files;
      handleFiles(files, fileListContainer, fileType);
    });

    dropArea.querySelector(".browse-link").addEventListener("click", () => {
      input.click();
    });

    input.addEventListener("change", (e) => {
      const files = e.target.files;
      handleFiles(files, fileListContainer, fileType);
    });
  };

  const handleFiles = (files, fileListContainer, fileType) => {
    for (const file of files) {
      if (fileType.includes("image") && file.type.startsWith("image/")) {
        const item = document.createElement("div");
        item.classList.add("image-item");
        const reader = new FileReader();
        reader.onload = (e) => {
          item.innerHTML = `
            <img src="${e.target.result}" alt="${file.name}" class="uploaded-image" />
            <span>${file.name}</span>
            <button class="remove-btn"><i class="fas fa-times"></i></button>
          `;
          fileListContainer.appendChild(item);
          item.querySelector(".remove-btn").addEventListener("click", () => {
            item.remove();
          });
        };
        reader.readAsDataURL(file);
      } else if (fileType.includes("document") && !file.type.startsWith("image/")) {
        const item = document.createElement("div");
        item.classList.add("file-item");
        item.innerHTML = `
          <i class="fas fa-file-alt"></i>
          <span>${file.name}</span>
          <button class="remove-btn"><i class="fas fa-times"></i></button>
        `;
        fileListContainer.appendChild(item);
        item.querySelector(".remove-btn").addEventListener("click", () => {
          item.remove();
        });
      }
    }
  };

  const fileUploadArea = document.getElementById("fileUploadArea");
  const fileInput = document.getElementById("fileInput");
  const uploadedFiles = document.getElementById("uploadedFiles");

  const imageUploadArea = document.getElementById("imageUploadArea");
  const imageInput = document.getElementById("imageInput");
  const uploadedImages = document.getElementById("uploadedImages");

  // Only call setup functions if elements exist
  if (fileUploadArea && fileInput && uploadedFiles) {
    setupFileUpload(fileUploadArea, fileInput, uploadedFiles, ["document"]);
  }
  if (imageUploadArea && imageInput && uploadedImages) {
    setupFileUpload(imageUploadArea, imageInput, uploadedImages, ["image"]);
  }

  // Mock report data (replace with real data fetching in a real app)
  const mockReportData = {
    'สัปดาห์ที่ 5': {
      title: 'รายงานสัปดาห์ที่ 5',
      meta: [
        { label: 'ระยะเวลา', value: '5 - 12 กันยายน 2566' },
        { label: 'วันที่ส่ง', value: '12 กันยายน 2566' },
        { label: 'สถานะ', value: '<span class="status-badge">ส่งแล้ว</span>' },
      ],
      topic: {
        title: 'หัวข้อการทำงานสัปดาห์นี้',
        content: 'การพัฒนาส่วนติดต่อผู้ใช้และทดสอบระบบแดชบอร์ด',
        description: 'พัฒนาและปรับปรุง User Interface สำหรับระบบแดชบอร์ดหลัก รวมถึงการทดสอบการทำงานของระบบและการปรับปรุงประสบการณ์ผู้ใช้ให้มีความสะดวกและใช้งานง่ายมากขึ้น'
      },
      details: [
        { label: 'สิ่งที่ทำสำเร็จในสัปดาห์นี้', content: 'ในสัปดาห์นี้ได้พัฒนาส่วนติดต่อผู้ใช้หลักของระบบแดชบอร์ดสำเร็จ โดยออกแบบ UI/UX ที่ทันสมัยและใช้งานง่าย ได้ทำการ implement responsive design ที่รองรับการใช้งานบนอุปกรณ์หลากหลายขนาด รวมถึงการทดสอบการทำงานของระบบ navigation และ data visualization components ต่างๆ ผลลัพธ์ที่ได้คือระบบที่มีประสิทธิภาพและสวยงาม' },
        { label: 'ปัญหาและอุปสรรคที่พบ', content: 'พบปัญหาในเรื่อง state management เมื่อมีการ update ข้อมูลแบบ real-time และปัญหา performance เมื่อมีข้อมูลจำนวนมาก นอกจากนี้ยังพบปัญหา compatibility issues กับ browser บางตัว ได้แก้ไขโดยการใช้ Redux สำหรับจัดการ state และ implement pagination พร้อม lazy loading เพื่อเพิ่มประสิทธิภาพ รวมถึงเพิ่ม polyfills สำหรับรองรับ browser เก่า' },
        { label: 'แผนงานสำหรับสัปดาห์หน้า', content: 'สัปดาห์หน้าจะเน้นไปที่การพัฒนาระบบ authentication และ user management รวมถึงการทำ unit testing และ integration testing ให้ครอบคลุม นอกจากนี้จะทำการปรับปรุง accessibility features และเพิ่มระบบ notification แบบ real-time เพื่อให้ระบบมีความสมบูรณ์มากขึ้น' }
      ],
      comments: [
        { author: 'รศ.ดร. เอกชัย วิบูลย์ธนากุล', role: 'อาจารย์ที่ปรึกษา', date: '12 กันยายน 2566', text: 'การพัฒนาส่วนติดต่อผู้ใช้มีความคืบหน้าดีมาก UI/UX ออกแบบได้สวยงามและใช้งานง่าย แต่ยังควรปรับปรุงการจัดการ state management และเพิ่มการตรวจสอบ input validation ให้มากขึ้น...' },
        { author: 'ผศ.ดร. สมชาย ใจดี', role: 'อาจารย์ประจำวิชา', date: '13 กันยายน 2566', text: 'เห็นด้วยกับความเห็นของอาจารย์ที่ปรึกษา การออกแบบ UI มีความสวยงามและทันสมัย อย่างไรก็ตาม ควรใส่ใจเรื่องการจัดการ error handling และ loading states ให้มากขึ้น...' }
      ],
      attachments: {
        documents: [
          { name: 'เอกสารการออกแบบระบบ.pdf', url: 'https://via.placeholder.com/300x200?text=เอกสารการออกแบบระบบ.pdf' },
          { name: 'แผนงานสัปดาห์ที่ 5.xlsx', url: 'https://via.placeholder.com/300x200?text=แผนงานสัปดาห์ที่ 5.xlsx' }
        ],
        images: [
          { name: 'หน้าจอ UI.png', url: 'https://via.placeholder.com/300x200?text=หน้าจอ UI' },
          { name: 'แผนผังฐานข้อมูล.jpg', url: 'https://via.placeholder.com/300x200?text=แผนผังฐานข้อมูล' }
        ]
      }
    },
    'สัปดาห์ที่ 4': {
      title: 'รายงานสัปดาห์ที่ 4',
      meta: [
        { label: 'ระยะเวลา', value: '28 ส.ค. - 4 ก.ย. 2566' },
        { label: 'วันที่ส่ง', value: '4 กันยายน 2566' },
        { label: 'สถานะ', value: '<span class="status-badge">ส่งแล้ว</span>' },
      ],
      topic: {
        title: 'หัวข้อการทำงานสัปดาห์นี้',
        content: 'การพัฒนาส่วนควบคุม',
        description: 'เริ่มเขียนโค้ดสำหรับส่วนควบคุมหลักและทดสอบเบื้องต้น'
      },
      details: [
        { label: 'สิ่งที่ทำสำเร็จในสัปดาห์นี้', content: 'เริ่มต้นการพัฒนาโค้ดสำหรับส่วนควบคุมหลักของระบบ รวมถึงการทดสอบการเชื่อมต่อกับเซ็นเซอร์ต่างๆ ที่ใช้ในโครงงาน IoT' },
        { label: 'ปัญหาและอุปสรรคที่พบ', content: 'พบปัญหาในการเชื่อมต่อข้อมูลแบบไร้สายระหว่างอุปกรณ์และเซิร์ฟเวอร์เนื่องจากความล่าช้าในการส่งข้อมูล ได้แก้ไขโดยการเพิ่มโค้ดในการบีบอัดข้อมูลก่อนส่ง' },
        { label: 'แผนงานสำหรับสัปดาห์หน้า', content: 'สัปดาห์หน้าจะเน้นไปที่การพัฒนาระบบ authentication และ user management รวมถึงการทำ unit testing และ integration testing ให้ครอบคลุม' }
      ],
      comments: [],
      attachments: {
        documents: [],
        images: [
          { name: 'ภาพวงจร.png', url: 'https://via.placeholder.com/300x200?text=ภาพวงจร' }
        ]
      }
    },
    'สัปดาห์ที่ 3': {
      title: 'รายงานสัปดาห์ที่ 3',
      meta: [
        { label: 'ระยะเวลา', value: '21 - 28 ส.ค. 2566' },
        { label: 'วันที่ส่ง', value: '28 สิงหาคม 2566' },
        { label: 'สถานะ', value: '<span class="status-badge">ส่งแล้ว</span>' },
      ],
      topic: {
        title: 'หัวข้อการทำงานสัปดาห์นี้',
        content: 'ออกแบบระบบ',
        description: 'ออกแบบสถาปัตยกรรมระบบ (System Architecture) และฐานข้อมูล'
      },
      details: [
        { label: 'สิ่งที่ทำสำเร็จในสัปดาห์นี้', content: 'ได้ทำการออกแบบสถาปัตยกรรมระบบและฐานข้อมูลเบื้องต้น รวมถึงการสร้างแผนผังการไหลของข้อมูล (data flow diagram)' },
        { label: 'ปัญหาและอุปสรรคที่พบ', content: 'ไม่พบปัญหาใหญ่เกิดขึ้นในสัปดาห์นี้' },
        { label: 'แผนงานสำหรับสัปดาห์หน้า', content: 'สัปดาห์หน้าจะเริ่มลงมือเขียนโค้ดสำหรับส่วนควบคุม' }
      ],
      comments: [],
      attachments: {
        documents: [
          { name: 'เอกสารการออกแบบ.docx', url: 'https://via.placeholder.com/300x200?text=เอกสารการออกแบบ.docx' }
        ],
        images: []
      }
    }
  };

  // New modal logic
  window.showReportModal = function(weekTitle) {
    const modal = document.getElementById('reportModal');
    const modalContent = modal.querySelector('.modal-content');

    // ตรวจสอบพารามิเตอร์ใน URL เพื่อกำหนดบทบาทของผู้ใช้
    const urlParams = new URLSearchParams(window.location.search);
    const userRole = urlParams.get('role') === 'instructor' ? 'instructor' : 'advisor';

    // Check if data exists for the given weekTitle
    const data = mockReportData[weekTitle];
    if (!data) {
      console.error('No data found for week:', weekTitle);
      modalContent.innerHTML = '<p>ไม่พบข้อมูลรายงานสำหรับสัปดาห์นี้</p>';
      modal.style.display = 'flex';
      return;
    }

    modalContent.innerHTML = `
      <button class="modal-close-btn">&times;</button>
      <div class="report-header">
        <h1 class="report-title">${data.title}</h1>
        <div class="report-meta">
          ${data.meta.map(item => `
            <div class="meta-item">
              <span class="meta-label">${item.label}</span>
              <span class="meta-value">${item.value}</span>
            </div>
          `).join('')}
        </div>
        <div class="topic-section">
          <div class="topic-title">
            <i class="fas fa-lightbulb"></i>
            หัวข้อการทำงานสัปดาห์นี้
          </div>
          <div class="topic-content">
            ${data.topic.content}
          </div>
          <div class="topic-description">
            ${data.topic.description}
          </div>
        </div>
      </div>
      <div class="work-details-section">
        <h2 class="work-details-title">
          <i class="fas fa-tasks"></i>
          รายละเอียดการทำงานในสัปดาห์นี้
        </h2>
        ${data.details.map(item => `
          <div class="work-detail-item">
            <div class="work-detail-label">
              <i class="fas fa-check-circle"></i>
              ${item.label}
            </div>
            <div class="work-detail-content">
              ${item.content}
            </div>
          </div>
        `).join('')}
      </div>
      
      ${data.attachments && (data.attachments.documents.length > 0 || data.attachments.images.length > 0) ? `
        <div class="attachments-section">
          <h2 class="section-title">
            <i class="fas fa-paperclip"></i>
            เอกสารและรูปภาพแนบ
          </h2>
          <div class="attachments-grid">
            ${data.attachments.documents.map(doc => `
              <a href="${doc.url}" target="_blank" class="attachment-card document">
                <i class="fas fa-file-alt card-icon"></i>
                <span class="file-name">${doc.name}</span>
              </a>
            `).join('')}
            ${data.attachments.images.map(img => `
              <a href="${img.url}" target="_blank" class="attachment-card image">
                <i class="fas fa-image card-icon"></i>
                <span class="file-name">${img.name}</span>
              </a>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="comments-section">
        <h2 class="comments-title">
          <i class="fas fa-comments"></i>
          ความคิดเห็นจากอาจารย์
        </h2>
        ${data.comments.length > 0 ? data.comments.map(comment => `
          <div class="comment-item ${comment.role.includes('ที่ปรึกษา') ? 'advisor' : 'instructor'}">
            <div class="comment-header">
              <div class="comment-author-info">
                <div class="comment-avatar ${comment.role.includes('ที่ปรึกษา') ? 'advisor' : 'instructor'}">อ</div>
                <div class="author-details">
                  <div class="author-name">${comment.author}</div>
                  <div class="author-role">${comment.role}</div>
                </div>
              </div>
              <div class="comment-date">${comment.date}</div>
            </div>
            <p class="comment-text">
              ${comment.text}
            </p>
          </div>
        `).join('') : '<p>ยังไม่มีความคิดเห็น</p>'}
      </div>
      
      ${userRole === 'advisor' || userRole === 'instructor' ? `
        <div class="evaluation-form-advisor">
          <h2 class="form-title">
            <i class="fas fa-edit"></i>
            การประเมินและให้ความคิดเห็น
          </h2>
          <form id="advisorForm">
            ${userRole === 'advisor' ? `
              <div class="form-group">
                <label for="progressRange">ความคืบหน้า: <span id="progressValue">50</span>%</label>
                <input type="range" id="progressRange" name="progress" min="0" max="100" value="50">
              </div>
            ` : ''}
            <div class="form-group">
              <label for="advisorComment">ความคิดเห็น:</label>
              <textarea id="advisorComment" name="comment" placeholder="ใส่ความคิดเห็นของคุณที่นี่..."></textarea>
            </div>
            <button type="submit" class="submit-btn">
              <i class="fas fa-save"></i> บันทึก
            </button>
          </form>
        </div>
      ` : ''}
    `;

    // Show the modal
    modal.style.display = 'flex';

    // Close modal on close button click
    modal.querySelector('.modal-close-btn').onclick = function() {
      modal.style.display = 'none';
    };

    // Close modal on overlay click
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };

    // New: Handle advisor form submission and progress range
    if (userRole === 'advisor' || userRole === 'instructor') {
      const progressRange = document.getElementById('progressRange');
      const progressValue = document.getElementById('progressValue');
      const advisorComment = document.getElementById('advisorComment');
      const advisorForm = document.getElementById('advisorForm');
      
      // Update the value display as the slider moves (only for advisor)
      if (userRole === 'advisor' && progressRange) {
        progressRange.addEventListener('input', function() {
          progressValue.textContent = this.value;
        });
      }

      // Handle form submission
      if (advisorForm) {
        advisorForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const newComment = advisorComment.value;
          let newProgress = null;

          if (newComment.trim() === '') {
            alert('กรุณาใส่ความคิดเห็นก่อนบันทึก');
            return;
          }

          if (userRole === 'advisor' && progressRange) {
            newProgress = progressRange.value;
          }

          // Call a function to save the data (mocked)
          updateProgressAndComment(weekTitle, newProgress, newComment, userRole);
          
          alert('บันทึกข้อมูลเรียบร้อยแล้ว!');
          modal.style.display = 'none';
        });
      }
    }
  };

  // New: Function to update the mock data
  function updateProgressAndComment(weekTitle, progress, comment, role) {
    const data = mockReportData[weekTitle];
    if (data) {
      const advisorName = role === 'advisor' ? 'รศ.ดร. เอกชัย วิบูลย์ธนากุล' : 'ผศ.ดร. สมชาย ใจดี';
      const userRoleText = role === 'advisor' ? 'อาจารย์ที่ปรึกษา' : 'อาจารย์ประจำวิชา';
      const currentDate = new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' });
      
      const newCommentObj = {
        author: advisorName,
        role: userRoleText,
        date: currentDate,
        text: comment
      };
      
      data.comments.push(newCommentObj);
      
      // Only update progress if the user is an advisor
      if (role === 'advisor') {
        const progressElement = document.querySelector('.project-info-card .progress-bar');
        if (progressElement) {
          progressElement.style.width = progress + '%';
        }
      }
    }
  }
});