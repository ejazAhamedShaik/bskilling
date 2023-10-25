import { ResultTypes } from "./types";

(function (d) {
  const signupButton: HTMLElement | null =
    document.querySelector("#signup-button");
  const signupModal: HTMLElement | null =
    document.querySelector("#signup-modal");
  const modalOverlay: HTMLElement | null =
    document.querySelector(".modal-overlay");
  const modalClose: HTMLElement | null = document.querySelector(".modal-close");
  const modalContent: HTMLElement | null =
    document.querySelector(".modal-content");

  if (signupButton && signupModal && modalOverlay && modalClose) {
    signupButton.addEventListener("click", () => {
      if (signupModal) {
        signupModal.classList.remove("hidden");
      }
    });

    modalOverlay.addEventListener("click", () => {
      if (signupModal) {
        signupModal.classList.add("hidden");
      }
    });

    modalClose.addEventListener("click", () => {
      if (signupModal) {
        signupModal.classList.add("hidden");
      }
    });

    modalContent?.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }
})(document);

/** Form validations */
(function (d) {
  const signupForm: HTMLFormElement | null =
    document.querySelector("#signup-form");

  if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent the default form submission

      const nameField: HTMLInputElement | null =
        document.querySelector("#name");
      const emailField: HTMLInputElement | null =
        document.querySelector("#email");
      const passwordField: HTMLInputElement | null =
        document.querySelector("#password");

      // Reset error messages
      const errorElements = document.querySelectorAll(".text-red-600");
      errorElements.forEach((element) => {
        if (element instanceof HTMLElement) {
          element.style.display = "none";
        }
      });

      let isValid = true;

      // Validate name
      if (!nameField || nameField.value.trim() === "") {
        const nameError: HTMLElement | null =
          document.querySelector("#name-error");
        if (nameError) {
          nameError.style.display = "block";
        }
        isValid = false;
      }

      // Validate email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailField || !emailPattern.test(emailField.value)) {
        const emailError: HTMLElement | null =
          document.querySelector("#email-error");
        if (emailError) {
          emailError.style.display = "block";
        }
        isValid = false;
      }

      // Validate password
      if (!passwordField || passwordField.value.length < 8) {
        const passwordError: HTMLElement | null =
          document.querySelector("#password-error");
        if (passwordError) {
          passwordError.style.display = "block";
        }
        isValid = false;
      }

      // If the form is valid, you can proceed with form submission or other actions
      if (isValid) {
        // You can submit the form here, e.g., signupForm.submit();
        signupForm.submit()
      }
    });
  }
})(document);

(async function (d) {
  let results: ResultTypes[] = [];
  await fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((json) => {
      results = json;
    });
  results = results.slice(0, 20);
  console.log(results);

  const container = d.getElementById("courses-list");

  const createCard = (item: ResultTypes) => {
    const divTag = d.createElement("div");
    const imgTag = d.createElement("img");
    const titleTag = d.createElement("p");
    const descriptionTag = d.createElement("p");

    const divTagStyle = [
      "max-w-sm",
      "p-6",
      "bg-white",
      "border",
      "border-gray-200",
      "rounded-lg",
      "shadow",
      "dark:bg-gray-800",
      "dark:border-gray-700",
    ];
    divTag.classList.add(...divTagStyle);
    imgTag.src = "#";
    imgTag.width = 100;
    imgTag.height = 100;
    titleTag.innerText = item.title;

    divTag.appendChild(imgTag);
    divTag.appendChild(imgTag);
    divTag.appendChild(titleTag);
    divTag.appendChild(descriptionTag);

    return divTag;
  };

  results.forEach((item) => {
    container?.appendChild(createCard(item));
  });
})(document);
