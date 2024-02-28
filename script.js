// scrolling  Buy ticket to select ticket section start
const easyTicketSection = document.getElementById("easy-ticket-section");
const getTicketBtn = document.getElementById("get-ticket-btn");
function scrollToEasyTicketSection() {
  easyTicketSection.scrollIntoView({ behavior: "smooth" });
}
getTicketBtn.addEventListener("click", scrollToEasyTicketSection);
// scrolling  Buy ticket to select ticket section start

// seat select, seat Info add , remaining seat , total seat, and maximum seat select, Start

const seats = document.getElementsByClassName("column-label");
for (const seatNum of seats) {
  seatNum.addEventListener("click", function (event) {
    const seatName = event.target.innerText;
    const seatClass = "Economy";
    const seatPrice = 550;
    const displaySeatInfo = document.getElementById("selected-seat-info");

    // Check if the seat is already selected
    if (event.target.classList.contains("selected-seat")) {
      // Remove the seat from selected seats
      event.target.classList.remove("selected-seat");

      // Remove the corresponding seat info
      const seatInfos = displaySeatInfo.querySelectorAll(".selected-seat-info");
      for (const seatInfo of seatInfos) {
        if (seatInfo.firstChild.innerText === seatName) {
          displaySeatInfo.removeChild(seatInfo);
          break;
        }
      }

      // Update remaining seats count
      document.getElementById("remaining-seats").innerText =
        convertValuetoNum("remaining-seats") + 1;

      // Update total seat count
      document.getElementById("totalSeatCount").innerText =
        convertValuetoNum("totalSeatCount") - 1;

      // Recalculate total cost
      calculateTotalCost(-seatPrice);

      // Recalculate grand total
      calculateGrandTotal();

      // Enable or disable coupon input and apply coupon button
      updateCouponControls();

      // Recalculate Discount price
      calculateDiscount();

      // Next Button enable disable
      nextButtonCondition();
    } else {
      // Check if maximum seat count reached
      const selectedSeatsCount =
        document.querySelectorAll(".selected-seat").length;
      if (selectedSeatsCount >= 4) {
        alert("You can only select up to 4 seats.");
        return;
      }

      // Create seat info element
      const div = document.createElement("div");
      div.classList.add("selected-seat-info");
      const p1 = document.createElement("p");
      const p2 = document.createElement("p");
      const p3 = document.createElement("p");
      p1.innerText = seatName;
      p2.innerText = seatClass;
      p3.innerText = seatPrice;
      div.appendChild(p1);
      div.appendChild(p2);
      div.appendChild(p3);

      // Mark the seat as selected
      event.target.classList.add("selected-seat");

      // Add seat info to the display
      displaySeatInfo.appendChild(div);

      // Update remaining seats count
      document.getElementById("remaining-seats").innerText =
        convertValuetoNum("remaining-seats") - 1;

      // Update total seat count
      document.getElementById("totalSeatCount").innerText =
        convertValuetoNum("totalSeatCount") + 1;

      // Recalculate total cost
      calculateTotalCost(seatPrice);

      // Recalculate grand total
      calculateGrandTotal();

      // Enable or disable coupon input and apply coupon button
      updateCouponControls();

      // Recalculate Discount price
      calculateDiscount();

      // Next Button enable disable
      nextButtonCondition();
    }
  });
}

// Enable or Disabled Input and appyCoupon Button Start
function updateCouponControls() {
  const selectedSeatsCount = document.querySelectorAll(".selected-seat").length;
  const couponInput = document.getElementById("coupon");
  const applyCouponBtn = document.getElementById("apply-coupon");
  const couponApplied = false; // Assuming it's defined elsewhere

  if (selectedSeatsCount === 4 && !couponApplied) {
    couponInput.disabled = false;
    applyCouponBtn.disabled = false;
  } else {
    couponInput.disabled = true;
    applyCouponBtn.disabled = true;
  }
  if (selectedSeatsCount < 4) {
    discountDisplay.classList.add("hidden");
    dividerDisplay.classList.add("hidden");
  }
}
// Enable or Disabled Input and appyCoupon Button Start

// Cupon Details start
const applyCouponBtn = document.getElementById("apply-coupon");
const couponInput = document.getElementById("coupon");
const couponError = document.getElementById("coupon-error");
const discountDisplay = document.getElementById("discount-count");
const dividerDisplay = document.getElementById("divider");

applyCouponBtn.addEventListener("click", function () {
  const couponCode = couponInput.value.trim();
  if (couponCode === "") {
    couponError.textContent = "Please enter a coupon code.";
    return;
  }
  // Apply coupon logic here
  if (couponCode !== "NEW15" && couponCode !== "Couple 20") {
    couponError.textContent = "Invalid coupon code. Please try again.";
    return;
  } else {
    couponApplied = true;
    couponInput.disabled = true;
    applyCouponBtn.disabled = true;
    couponInput.style.display = "none";
    applyCouponBtn.style.display = "none";
    couponError.textContent = "";
    discountDisplay.classList.remove("hidden");
    dividerDisplay.classList.remove("hidden");
    // Recalculate Discount price
    calculateDiscount();
  }
});
// Cupon Details end

// seat select, seat Info add , remaining seat  ,total seat, and maximum seat select, END

// Claculate Total Cost start
function calculateTotalCost(seatPrice) {
  const totalCost = convertValuetoNum("total-price");
  const convertedSeatPrice = parseInt(seatPrice);

  document.getElementById("total-price").innerText =
    totalCost + convertedSeatPrice;
}
// Claculate Total Cost end

// Claculate GrandTotal Cost start

function calculateGrandTotal(check) {
  const totalCost = convertValuetoNum("total-price");
  if (check === undefined) {
    document.getElementById("grand-total-price").innerText = totalCost;
  } else {
    const couponCode = document.getElementById("coupon").value.trim();

    if (couponCode === "NEW15") {
      const discountPrice = totalCost * 0.15;
      document.getElementById("grand-total-price").innerText =
        totalCost - discountPrice;
    } else if (couponCode === "Couple 20") {
      const discountPrice = totalCost * 0.2;
      document.getElementById("grand-total-price").innerText =
        totalCost - discountPrice;
    }
  }
}
// Claculate GrandTotal Cost end

// Calculate Discount Price start

function calculateDiscount(show) {
  const totalCost = convertValuetoNum("total-price");
  const couponCode = document.getElementById("coupon").value.trim();

  if (couponCode === "NEW15") {
    const discountPrice = totalCost * 0.15;
    console.log("Discount price", discountPrice);
    document.getElementById("discount-price").innerText = discountPrice;
  }
  if (couponCode === "Couple 20") {
    const discountPrice = totalCost * 0.2;
    document.getElementById("discount-price").innerText = discountPrice;
  }
}
// Calculate Discount Price END

// Function condition to enable next button start

const phoneNumberInput = document.getElementById("phone-number");
phoneNumberInput.addEventListener("input", nextButtonCondition);
function nextButtonCondition() {
  console.log("Inside nextButtonCondition");
  const checkoutBtn = document.getElementById("checkout-btn");
  const selectedSeatsCount = document.querySelectorAll(".selected-seat").length;
  const contactNumber = document.getElementById("phone-number").value.trim();
  console.log("Selected seats count:", selectedSeatsCount);
  console.log("Contact number:", contactNumber);

  if (selectedSeatsCount > 0 && contactNumber !== "") {
    checkoutBtn.disabled = false; // Enable checkout button
  } else {
    checkoutBtn.disabled = true; // Disable checkout button
  }
}
// Function condition to enable next button END

// CLICK ON NEXT BUTTON TO OPEN POPUP start
const openModal = document.getElementById("checkout-btn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
openModal.addEventListener("click", () => {
  modal.classList.remove("hidden");
});
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});
// CLICK ON CONTINUE BUTTON TO CLOSE POPUP End

// Function for after click on next button
const checkoutBtn = document.getElementById("checkout-btn");
checkoutBtn.addEventListener("click", function () {
  const selectedSeats = document.querySelectorAll(".selected-seat");
  const contactNumberInput = document.getElementById("phone-number");
  const userNameInput = document.getElementById("user-name");
  const emailIdInput = document.getElementById("email-id");
  const couponInput = document.getElementById("coupon");
  const applyCouponBtn = document.getElementById("apply-coupon");
  const grandTotalDisplay = document.getElementById("grand-total-price");
  const totalPriceDisplay = document.getElementById("total-price");
  const discountDisplay = document.getElementById("discount-count");
  const dividerDisplay = document.getElementById("divider");

  // Hide selected seat info
  const selectedSeatInfo = document.querySelectorAll(".selected-seat-info");
  selectedSeatInfo.forEach((info) => {
    info.classList.add("hidden");
  });

  // Unselect selected seats and update UI
  selectedSeats.forEach((seat) => {
    seat.classList.remove("selected-seat");
  });

  // Reset contact number input field
  contactNumberInput.value = "";

  // Reset other input fields if needed
  userNameInput.value = "";
  emailIdInput.value = "";

  // Reset coupon input field and make it visible
  couponInput.value = "";
  couponInput.disabled = false;
  couponInput.style.display = "inline";
  applyCouponBtn.disabled = false;
  applyCouponBtn.style.display = "inline";

  // Reset grand total and total price
  grandTotalDisplay.textContent = "0";
  totalPriceDisplay.textContent = "0";

  // Reset the displayed discount
  discountDisplay.classList.add("hidden");
  dividerDisplay.classList.add("hidden");
});
// Function for after click on next End

// Function for conver any value to number ----------
function convertValuetoNum(id) {
  const x = document.getElementById(id).innerText;
  const y = parseInt(x);
  return y;
}
