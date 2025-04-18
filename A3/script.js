// Grade color mapping
function getGradeColorClass(grade) {
  if (grade.startsWith("A")) return "text-green-600";
  if (grade.startsWith("B")) return "text-blue-600";
  if (grade.startsWith("C")) return "text-yellow-600";
  if (grade.startsWith("D")) return "text-red-600";
  return "text-gray-600";
}

// Status class mapping
function getStatusClass(status) {
  return status === "Completed"
    ? ["bg-green-100", "text-green-800"]
    : ["bg-red-100", "text-red-800"];
}

function populateSemesterData(semester) {
  const data = gradesData[semester];
  if (!data) return;

  // Update header information
  document.getElementById("semester-title").textContent = `${semester} Grades`;
  document.getElementById(
    "last-updated"
  ).textContent = `Last updated: ${data.lastUpdated}`;

  // Update table rows
  const rows = document.querySelectorAll("tbody tr");
  data.courses.forEach((course, index) => {
    const row = rows[index];

    // Update course information
    row.cells[0].textContent = course.code;
    row.cells[1].textContent = course.title;
    row.cells[2].textContent = course.credits;

    // Update grade with color coding
    const gradeCell = row.cells[3];
    gradeCell.textContent = course.grade;
    gradeCell.className = `px-6 py-4 whitespace-nowrap text-sm font-semibold ${getGradeColorClass(
      course.grade
    )}`;

    // Update grade points
    row.cells[4].textContent = course.gradePoint.toFixed(1);

    // Update status badge
    const statusCell = row.cells[5];
    const statusSpan = statusCell.querySelector("span");
    const [bgClass, textClass] = getStatusClass(course.status);
    statusSpan.className = `px-2 py-1 text-xs font-semibold rounded-full ${bgClass} ${textClass}`;
    statusSpan.textContent = course.status;
  });

  // Update summary section
  document.getElementById("total-credit-hours").textContent =
    data.totalCreditHours;
  document.getElementById("semester-gpa").textContent =
    data.semesterGPA.toFixed(2);
  document.getElementById("cumulative-gpa").textContent =
    data.cumulativeGPA.toFixed(2);
}

// Function to render services
function renderServices() {
  const servicesContainer = document.getElementById("services");
  console.log("servicesContainer", servicesContainer);

  if (!servicesContainer) return;

  servicesContainer.innerHTML = servicesData
    .map(
      (service) => `
    <div class="w-[150px] mb-4 md:mb-0">
      <a style="text-decoration: none" href="${service.link}">
        <div class="flex justify-center items-center flex-col service-box1 font-icon shadow"
          style="
            padding-top: 5px;
            margin-bottom: 5px;
            min-height: 110px;
            background-image: url('${service.bgImage}');
            background-color: rgb(242, 242, 242);"
          onmouseover="this.style.backgroundColor='#b4c9f9'"
          onmouseout="this.style.backgroundColor='#f2f2f2'">
          <span class="icon">
            <img src="${service.icon}" width="45" style="" />
            <br style="clear: both" />
          </span>
          <h3>${service.title}</h3>
        </div>
      </a>
    </div>
  `
    )
    .join("");
}

// Function to render statistics
function renderStatistics() {
  const statisticsContainer = document.getElementById("statistics");
  if (!statisticsContainer) return;

  statisticsContainer.innerHTML = statisticsData
    .map(
      (stat) => `
      <div 
        class="h-[100px] md:h-[120px] w-[100px] md:w-[120px] flex flex-col justify-center items-center text-center text-white"
        style="background-color: ${stat.bgColor}"
      >
        <span class="text-[24px] font-bold">${stat.count}</span>
        <span class="text-[18px]">${stat.label}</span>
      </div>
    `
    )
    .join("");
}

// Function to render assets section using DOM manipulation
function renderAssets() {
  const assetsContainer = document.getElementById("assets");
  if (!assetsContainer) return;

  // Clear any existing content
  while (assetsContainer.firstChild) {
    assetsContainer.removeChild(assetsContainer.firstChild);
  }

  assetsData.forEach((asset) => {
    // Create asset container div
    const assetDiv = document.createElement("div");

    // Create and set up heading
    const heading = document.createElement("h3");
    heading.className = "font-bold text-lg mb-4";
    heading.textContent = asset.title;

    // Create and set up image
    const img = document.createElement("img");
    img.src = asset.image;
    img.alt = asset.alt;
    img.className = "mx-auto w-48 h-60";
    img.style.objectFit = asset.objectFit || "cover";

    // Assemble the elements
    assetDiv.appendChild(heading);
    assetDiv.appendChild(img);
    assetsContainer.appendChild(assetDiv);
  });
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  renderServices();
  renderStatistics();
  renderAssets();
  const initialSemester = document.getElementById("semester")?.value;
  if (!initialSemester) return;
  populateSemesterData(initialSemester);
});

document.querySelector("button")?.addEventListener("click", () => {
  const selectedSemester = document.getElementById("semester").value;
  populateSemesterData(selectedSemester);
});

function submitAndResetForm() {
  const form = document.querySelector("form");
  if (!form) return;

  // Submit the form (simulate form submission)
  console.log("Form submitted with the following data:");
  const formData = new FormData(form);
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });

  // Reset the form
  form.reset();
  console.log("Form has been reset.");
}

// Add event listener for form submission
document.querySelector("form")?.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission behavior
  submitAndResetForm();
});
