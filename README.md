# 🏆 Digital Certificate Generator

A modern and responsive **Digital Certificate Generator** built using HTML, CSS, and JavaScript. This application allows users to create professional certificates, customize certificate details, preview designs in real time, and download certificates in PDF and PNG formats.

## 🚀 Features

- **Modern Dashboard:** Clean and responsive user interface.
- **Multiple Templates:** Three professional certificate designs:
  - Classic Gold
  - Modern Blue
  - Minimal Elegant
- **Custom Certificate Details:** Enter recipient name, course name, organization, instructor, and issue date.
- **Unique Certificate ID:** Automatically generates a certificate identification number.
- **Live Preview:** View certificate changes instantly while entering details.
- **PDF Download:** Download certificates in PDF format.
- **PNG Download:** Export certificates as high-quality images.
- **Certificate History:** Save and manage previously generated certificates.
- **Search Functionality:** Search certificates by recipient name, course, or certificate ID.
- **Delete Certificates:** Remove saved certificates from history.
- **Print Support:** Print certificates directly from the browser.
- **LocalStorage:** Stores certificate history in the browser.
- **Responsive Design:** Works on desktop, tablet, and mobile screens.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Styling and responsive design |
| JavaScript | Application functionality |
| LocalStorage | Certificate history storage |
| html2canvas | Convert certificate into an image |
| jsPDF | Generate PDF certificates |

## 📁 Project Structure

```text
Digital-Certificate-Generator/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## ⚙️ How to Run the Project

1. Clone this repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

2. Open the project folder in VS Code.

3. Make sure the following files are available:
   - `index.html`
   - `style.css`
   - `script.js`

4. Install the **Live Server** extension in VS Code.

5. Right-click `index.html`.

6. Select **Open with Live Server**.

7. The Digital Certificate Generator will open in your browser.

**Note:** An internet connection is required to load the external html2canvas and jsPDF libraries and Google Fonts.

## 📸 How to Use

1. Open the Digital Certificate Generator website.
2. Enter the recipient's name.
3. Enter the course or achievement name.
4. Provide the organization name.
5. Enter the instructor or authorized person's name.
6. Select the issue date.
7. Choose your preferred certificate template.
8. Click **Generate Certificate**.
9. Preview the certificate.
10. Click **Save to History** to store it.
11. Download the certificate as PDF or PNG.

## 🎨 Available Certificate Templates

- **Classic Gold:** Elegant gold-bordered certificate design.
- **Modern Blue:** Professional blue-themed certificate design.
- **Minimal Elegant:** Simple and clean certificate design.

## 💡 Project Objectives

- To develop a user-friendly certificate creation application.
- To understand JavaScript DOM manipulation and event handling.
- To implement browser-based data storage using LocalStorage.
- To generate downloadable documents using JavaScript libraries.
- To develop responsive web application interfaces.

## 🔮 Future Enhancements

- User authentication and login system.
- QR code-based certificate verification.
- Cloud database integration.
- Bulk certificate generation.
- Custom logo and background uploads.
- Email certificate delivery.
- Admin dashboard and certificate management.

## ⚠️ Limitations

- Certificate data is stored locally in the browser.
- Certificates are not independently verified or officially authenticated.
- Certificate history is not synchronized across different devices.
- A backend and verification service would be needed for trusted certificate authentication.

## 👩‍💻 Author

**Sri Nithya**

Developed as a frontend web development project using HTML, CSS, and JavaScript.

## 📜 License

This project is created for educational and portfolio purposes. You are welcome to explore and modify it for learning.
