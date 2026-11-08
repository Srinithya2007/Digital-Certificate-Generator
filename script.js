
// ========================================
// CERTIFYPRO - DIGITAL CERTIFICATE GENERATOR
// ========================================

const form = document.getElementById("certificateForm");
const certificate = document.getElementById("certificate");

const recipient = document.getElementById("recipient");
const course = document.getElementById("course");
const organization = document.getElementById("organization");
const instructor = document.getElementById("instructor");
const issueDate = document.getElementById("issueDate");
const template = document.getElementById("template");
const certificateTitle = document.getElementById("certificateTitle");
const certificateId = document.getElementById("certificateId");

const saveBtn = document.getElementById("saveBtn");
const downloadPdf = document.getElementById("downloadPdf");
const downloadPng = document.getElementById("downloadPng");
const printBtn = document.getElementById("printBtn");

const historyList = document.getElementById("historyList");
const searchHistory = document.getElementById("searchHistory");
const emptyMessage = document.getElementById("emptyMessage");

const STORAGE_KEY = "certifypro_certificates";

let certificates = [];

try {
    certificates = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    if (!Array.isArray(certificates)) {
        certificates = [];
    }
} catch (error) {
    certificates = [];
}

// ========================================
// 1. GENERATE UNIQUE CERTIFICATE ID
// ========================================

function generateCertificateId() {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);

    return "CERT-" + new Date().getFullYear() + "-" + randomNumber;
}

// ========================================
// 2. INITIALIZE APPLICATION
// ========================================

function initializeApp() {
    const today = new Date();

    issueDate.value =
        today.getFullYear() + "-" +
        String(today.getMonth() + 1).padStart(2, "0") + "-" +
        String(today.getDate()).padStart(2, "0");

    certificateId.value = generateCertificateId();

    updatePreview();
    renderHistory();
}

initializeApp();

// ========================================
// 3. UPDATE CERTIFICATE PREVIEW
// ========================================

function updatePreview() {

    document.getElementById("previewRecipient").textContent =
        recipient.value.trim() || "Recipient Name";

    document.getElementById("previewCourse").textContent =
        course.value.trim() || "Web Development";

    document.getElementById("previewOrganization").textContent =
        organization.value.trim().toUpperCase() || "YOUR ORGANIZATION";

    document.getElementById("previewInstructor").textContent =
        instructor.value.trim() || "Authorized Person";

    document.getElementById("previewTitle").textContent =
        certificateTitle.value.trim() || "CERTIFICATE OF ACHIEVEMENT";

    document.getElementById("previewId").textContent =
        certificateId.value;

    if (issueDate.value) {
        const date = new Date(issueDate.value + "T00:00:00");

        document.getElementById("previewDate").textContent =
            date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }).toUpperCase();
    } else {
        document.getElementById("previewDate").textContent = "ISSUE DATE";
    }

    // Apply selected template

    certificate.classList.remove("classic", "modern", "minimal");

    certificate.classList.add(template.value);
}

// Update preview whenever form values change

[
    recipient,
    course,
    organization,
    instructor,
    issueDate,
    template,
    certificateTitle
].forEach(element => {
    element.addEventListener("input", updatePreview);
    element.addEventListener("change", updatePreview);
});

// ========================================
// 4. FORM VALIDATION
// ========================================

function validateForm() {

    if (!form.reportValidity()) {
        return false;
    }

    if (!recipient.value.trim() ||
        !course.value.trim() ||
        !organization.value.trim() ||
        !issueDate.value) {

        showToast("Please fill in all required fields.");
        return false;
    }

    return true;
}

// ========================================
// 5. GENERATE CERTIFICATE
// ========================================

form.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!validateForm()) return;

    updatePreview();

    showToast("Certificate generated successfully!");
});

// ========================================
// 6. GET CERTIFICATE DATA
// ========================================

function getCertificateData() {

    return {
        id: certificateId.value,
        recipient: recipient.value.trim(),
        course: course.value.trim(),
        organization: organization.value.trim(),
        instructor: instructor.value.trim() || "Authorized Person",
        date: issueDate.value,
        title: certificateTitle.value.trim() ||
               "CERTIFICATE OF ACHIEVEMENT",
        template: template.value,
        createdAt: new Date().toISOString()
    };
}

// ========================================
// 7. SAVE CERTIFICATE TO LOCALSTORAGE
// ========================================

saveBtn.addEventListener("click", function() {

    if (!validateForm()) return;

    const data = getCertificateData();

    // Avoid saving the same certificate twice

    const alreadyExists = certificates.some(item => item.id === data.id);

    if (alreadyExists) {
        showToast("This certificate is already saved.");
        return;
    }

    certificates.unshift(data);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(certificates));

    renderHistory();

    showToast("Certificate saved to history!");
});

// ========================================
// 8. DISPLAY SAVED CERTIFICATE HISTORY
// ========================================

function renderHistory(searchText = "") {

    historyList.replaceChildren();

    const filteredCertificates = certificates.filter(item => {

        const search = searchText.toLowerCase();

        return (
            item.recipient.toLowerCase().includes(search) ||
            item.course.toLowerCase().includes(search) ||
            item.id.toLowerCase().includes(search)
        );
    });

    document.getElementById("totalCertificates").textContent =
        certificates.length;

    emptyMessage.style.display =
        filteredCertificates.length === 0 ? "block" : "none";

    filteredCertificates.forEach(item => {

        const card = document.createElement("div");
        card.className = "history-item";

        const name = document.createElement("h3");
        name.textContent = item.recipient;

        const courseText = document.createElement("p");
        courseText.textContent = "Course: " + item.course;

        const idText = document.createElement("p");
        idText.textContent = "ID: " + item.id;

        const organizationText = document.createElement("p");
        organizationText.textContent = item.organization;

        const actions = document.createElement("div");
        actions.className = "history-actions";

        const viewButton = document.createElement("button");
        viewButton.className = "view-btn";
        viewButton.textContent = "View";

        viewButton.addEventListener("click", () => {
            loadCertificate(item.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            deleteCertificate(item.id);
        });

        actions.append(viewButton, deleteButton);

        card.append(
            name,
            courseText,
            idText,
            organizationText,
            actions
        );

        historyList.appendChild(card);
    });
}

// ========================================
// 9. SEARCH CERTIFICATE HISTORY
// ========================================

searchHistory.addEventListener("input", function() {

    renderHistory(this.value.trim());

});

// ========================================
// 10. LOAD SAVED CERTIFICATE
// ========================================

function loadCertificate(id) {

    const item = certificates.find(cert => cert.id === id);

    if (!item) return;

    recipient.value = item.recipient;
    course.value = item.course;
    organization.value = item.organization;
    instructor.value = item.instructor;
    issueDate.value = item.date;
    certificateTitle.value = item.title;
    template.value = item.template;
    certificateId.value = item.id;

    updatePreview();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    showToast("Certificate loaded successfully!");
}

// ========================================
// 11. DELETE CERTIFICATE
// ========================================

function deleteCertificate(id) {

    const confirmed = window.confirm(
        "Are you sure you want to delete this certificate?"
    );

    if (!confirmed) return;

    certificates = certificates.filter(item => item.id !== id);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(certificates));

    renderHistory();

    showToast("Certificate deleted successfully!");
}

// ========================================
// 12. CREATE CERTIFICATE IMAGE
// ========================================

async function createCertificateImage() {

    updatePreview();

    if (!window.html2canvas) {
        throw new Error("Image export library is unavailable.");
    }

    return await html2canvas(certificate, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false
    });
}

// ========================================
// 13. DOWNLOAD PNG
// ========================================

downloadPng.addEventListener("click", async function() {

    if (!validateForm()) return;

    try {

        downloadPng.disabled = true;
        downloadPng.textContent = "Preparing PNG...";

        const canvas = await createCertificateImage();

        const link = document.createElement("a");

        link.download = "Certificate-" + certificateId.value + ".png";

        link.href = canvas.toDataURL("image/png");

        link.click();

        showToast("PNG downloaded successfully!");

    } catch (error) {

        console.error(error);
        showToast("PNG download failed. Please try again.");

    } finally {

        downloadPng.disabled = false;
        downloadPng.textContent = "↓ Download PNG";

    }
});

// ========================================
// 14. DOWNLOAD PDF
// ========================================

downloadPdf.addEventListener("click", async function() {

    if (!validateForm()) return;

    try {

        downloadPdf.disabled = true;
        downloadPdf.textContent = "Preparing PDF...";

        const canvas = await createCertificateImage();

        if (!window.jspdf) {
            throw new Error("PDF library is unavailable.");
        }

        const { jsPDF } = window.jspdf;

        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "pt",
            format: "a4"
        });

        const imageData = canvas.toDataURL("image/png");

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(
            imageData,
            "PNG",
            0,
            0,
            pageWidth,
            pageHeight
        );

        pdf.save("Certificate-" + certificateId.value + ".pdf");

        showToast("PDF downloaded successfully!");

    } catch (error) {

        console.error(error);
        showToast("PDF download failed. Please try again.");

    } finally {

        downloadPdf.disabled = false;
        downloadPdf.textContent = "↓ Download PDF";

    }
});

// ========================================
// 15. PRINT CERTIFICATE
// ========================================

printBtn.addEventListener("click", function() {

    if (!validateForm()) return;

    window.print();

});

// ========================================
// 16. RESET FORM
// ========================================

form.addEventListener("reset", function() {

    setTimeout(() => {

        certificateId.value = generateCertificateId();

        issueDate.value = new Date().getFullYear() + "-" +
            String(new Date().getMonth() + 1).padStart(2, "0") + "-" +
            String(new Date().getDate()).padStart(2, "0");

        template.value = "classic";

        updatePreview();

        showToast("Form has been reset!");

    }, 0);

});

// ========================================
// 17. TOAST NOTIFICATION
// ========================================

let toastTimer;

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2800);
}
