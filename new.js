function waitForAddVideoButton() {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      const addVideoButton = Array.from(
        document.querySelectorAll('div[role="button"]')
      ).find((el) => el.textContent.includes("Add Video"));

      if (addVideoButton) {
        clearInterval(intervalId); // Stop checking
        addVideoButton.click(); // Click the button
        console.log("Add video button clicked");
        resolve(); // Resolve the Promise when the button is clicked
      }
    }, 1000); // Check every second
  });
}

// Function 2
function findElementWithText(selector, text, callback) {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      const element = Array.from(document.querySelectorAll(selector)).find(
        (el) => el.textContent.includes(text)
      );

      if (element) {
        clearInterval(intervalId); // Stop checking
        callback(element); // Execute the callback with the found element
        resolve(); // Resolve the Promise when the element is found
      }
    }, 1000); // Check every second
  });
}

// Function 3
function waitForNextButtonAndClick() {
  return new Promise((resolve) => {
    function findNextButton() {
      const buttons = document.querySelectorAll('div[role="button"]');
      for (let button of buttons) {
        if (button.textContent.trim() === "Next") {
          return button;
        }
      }
      return null;
    }

    let nextButton = findNextButton();
    if (!nextButton) {
      console.error("Next button not found");
      resolve(); // Resolve to move to the next function even if the button is not found
      return;
    }

    if (
      !nextButton.getAttribute("aria-disabled") ||
      nextButton.getAttribute("aria-disabled") === "false"
    ) {
      nextButton.click();
      resolve(); // Resolve after clicking the button
      return;
    }

    const observer = new MutationObserver((mutationsList, observer) => {
      nextButton = findNextButton();
      if (nextButton) {
        if (
          !nextButton.getAttribute("aria-disabled") ||
          nextButton.getAttribute("aria-disabled") === "false"
        ) {
          nextButton.click();
          observer.disconnect(); // Stop observing after clicking the button
          resolve(); // Resolve after clicking the button
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });
}

// Function 4
function waitForScheduleButtonAndClick() {
  return new Promise((resolve) => {
    function findScheduleButton() {
      const buttons = document.querySelectorAll('div[role="button"]');
      for (let button of buttons) {
        if (button.textContent.trim() === "Schedule") {
          return button;
        }
      }
      return null;
    }

    let scheduleButton = findScheduleButton();
    if (!scheduleButton) {
      console.error("Schedule button not found");
      resolve(); // Resolve to move to the next function even if the button is not found
      return;
    }

    if (
      !scheduleButton.getAttribute("aria-disabled") ||
      scheduleButton.getAttribute("aria-disabled") === "false"
    ) {
      scheduleButton.click();
      resolve(); // Resolve after clicking the button
      return;
    }

    const observer = new MutationObserver((mutationsList, observer) => {
      scheduleButton = findScheduleButton();
      if (scheduleButton) {
        if (
          !scheduleButton.getAttribute("aria-disabled") ||
          scheduleButton.getAttribute("aria-disabled") === "false"
        ) {
          scheduleButton.click();
          observer.disconnect(); // Stop observing after clicking the button
          resolve(); // Resolve after clicking the button
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });
}

// Function 5
function waitForInputAndClick() {
  return new Promise((resolve) => {
    function findDateInput() {
      return document.querySelector('input[placeholder="mm/dd/yyyy"]');
    }

    const intervalId = setInterval(() => {
      const dateInput = findDateInput();
      if (dateInput) {
        clearInterval(intervalId); // Stop checking
        dateInput.click(); // Click the input field
        console.log("Input field clicked");
        resolve(); // Resolve the Promise when the input field is clicked
      }
    }, 1000); // Check every second
  });
}

// Function 6
// Function to wait for a specific element with role="link" and class "xmi5d70" and click it
function waitForSpecificElementAndClick() {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      // Find the specific element by its role and class
      const specificElement = document.querySelector('a[role="link"].xmi5d70');

      if (specificElement) {
        clearInterval(intervalId); // Stop checking
        specificElement.click(); // Click the element
        console.log("Specific element clicked");
        resolve(); // Resolve the Promise when the element is clicked
      }
    }, 1000); // Check every second
  });
}

//Function 7
// Function to wait for a specific div with role="tab" and aria-label="Saved" and click it
function waitForTabAndClick() {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      // Find the specific div by its role and aria-label
      const tabElement = document.querySelector(
        'div[role="tab"][aria-label="Saved"]'
      );

      if (tabElement) {
        clearInterval(intervalId); // Stop checking
        tabElement.click(); // Click the element
        console.log("Tab element with aria-label 'Saved' clicked");
        resolve(); // Resolve the Promise when the element is clicked
      }
    }, 1000); // Check every second
  });
}

// Function 8
// Function to wait for multiple checkboxes with aria-label starting with '#' and click them
function waitForCheckboxesAndClick() {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      // Find all checkboxes with aria-label starting with '#'
      const checkboxes = Array.from(
        document.querySelectorAll('input[type="checkbox"]')
      ).filter((input) => input.getAttribute("aria-label")?.startsWith("#"));

      if (checkboxes.length > 0) {
        clearInterval(intervalId); // Stop checking
        checkboxes.forEach((checkbox) => {
          if (!checkbox.checked) {
            // Only click if not already checked
            checkbox.click(); // Click each checkbox
            console.log(
              "Checkbox clicked:",
              checkbox.getAttribute("aria-label")
            );
          }
        });
        resolve(); // Resolve the Promise when all checkboxes are clicked
      }
    }, 1000); // Check every second
  });
}

// Function 9
// Function to wait for a specific div with role="button" and containing "Add (10)" and click it
function waitForAddButtonAndClick() {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      // Find the div with role="button" and containing the text "Add (10)"
      const buttonElement = Array.from(
        document.querySelectorAll('div[role="button"]')
      ).find((el) => el.textContent.includes("Add (9)"));

      if (buttonElement) {
        clearInterval(intervalId); // Stop checking
        buttonElement.click(); // Click the element
        console.log("Button with 'Add (10)' clicked");
        resolve(); // Resolve the Promise when the element is clicked
      }
    }, 1000); // Check every second
  });
}

// Function 10
// Function to wait for a specific div with role="button" and containing "Create Reel" and click it
function waitForCreateReelButtonAndClick() {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      // Find the div with role="button" and containing the text "Create Reel"
      const buttonElement = Array.from(
        document.querySelectorAll('div[role="button"]')
      ).find((el) => el.textContent.includes("Create reel"));

      if (buttonElement) {
        clearInterval(intervalId); // Stop checking
        buttonElement.click(); // Click the element
        console.log("Button with 'Create Reel' clicked");
        resolve(); // Resolve the Promise when the element is clicked
      }
    }, 1000); // Check every second
  });
}

function waitForElementWithTextAndClick(value) {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      // Get all elements with the role "button"
      const elements = document.querySelectorAll('div[role="button"]');

      // Loop through the elements to find one with matching text
      let found = false;
      elements.forEach((element) => {
        // Trim the inner text and check if it matches the value
        const innerText = element.innerText.trim();
        if (innerText == value) {
          // Log the matching element and its inner text
          console.log(
            `Found matching element:`,
            element,
            `with text:`,
            innerText
          );

          // Trigger a click event on the matching element
          element.click();
          console.log(`Clicked element with text:`, innerText);
          found = true;
        }
      });

      if (found) {
        clearInterval(intervalId); // Stop checking if an element was clicked
        resolve(); // Resolve the Promise when the element is clicked
      }
    }, 1000); // Check every second
  });
}

let runCount = 0; // Counter for tracking function runs

const timeDateDiv = document.createElement("div");
// Initial styles for the div
Object.assign(timeDateDiv.style, {
  position: "fixed",
  top: "10px",
  right: "10px",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  color: "white",
  padding: "10px",
  borderRadius: "5px",
  fontFamily: "Arial, sans-serif",
  fontSize: "14px",
  zIndex: 9999,
});

document.body.appendChild(timeDateDiv);

function updateTime() {
  // Base hour: starts at 4:00
  const baseHour = 4;
  // Increment time by 2 hours for each run, loop back every 5 times
  const hours = baseHour + (runCount % 5) * 2;
  const now = new Date();
  now.setHours(hours, 0, 0); // Set time to hours:00:00
  timeDateDiv.textContent = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
}

async function runAllFunctions(firstDate) {
  try {
    // Update time immediately
    updateTime();

    runCount++;
    console.log(`Run Count: ${runCount}`); // Log run count

    // Execute each function in sequence
    await waitForAddVideoButton();
    console.log("Function 1 completed");

    await findElementWithText("span.xmi5d70", "100%", (element) => {
      console.log("Element with 100% text found:", element);
    });
    console.log("Function 2 (first call) completed");

    await waitForSpecificElementAndClick();
    console.log("Function 3 (first call) completed");

    await waitForTabAndClick();
    console.log("Function 4 completed");

    await waitForCheckboxesAndClick();
    console.log("Function 5 completed");

    await waitForAddButtonAndClick();
    console.log("Function 6 completed");

    await waitForNextButtonAndClick();
    console.log("Function 7 (first call) completed");

    await waitForNextButtonAndClick();
    console.log("Function 7 (second call) completed");

    await waitForScheduleButtonAndClick();
    console.log("Function 8 completed");

    await waitForInputAndClick();
    console.log("Function 9 completed");

    await waitForElementWithTextAndClick(firstDate);
    console.log("Function 10 completed");

    await waitForCreateReelButtonAndClick();
    console.log("Function 11 completed");

    // Increment firstDate after every 5 runs
    if (runCount % 5 === 0) {
      console.log(
        `Incrementing firstDate from ${firstDate} to ${parseInt(firstDate) + 1}`
      );
      firstDate = (parseInt(firstDate) + 1).toString();
    }

    // Recursive call to continue running functions
    runAllFunctions(firstDate);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Call the combined function
runAllFunctions(11);
