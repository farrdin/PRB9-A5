document.addEventListener("DOMContentLoaded", function () {
  const seatColumnsContainer = document.getElementById("seat-columns");
  const selectedSeatDisplay = document.getElementById("selected-seat");
  const checkoutBtn = document.getElementById("checkout-btn");
  const couponInput = document.getElementById("coupon");
  const applyCouponBtn = document.getElementById("apply-coupon");
  const selectedSeatInfoContainer =
    document.getElementById("selected-seat-info");
  const totalSeatNumber = document.getElementById("totalseatnumber");
  const totalPriceDisplay = document.getElementById("total-price");
  const discountPriceDisplay = document.getElementById("discount-price");
  const discountCountDisply = document.getElementById("discount-count");
  const grandTotalDisplay = document.getElementById("grand-total-price");
  const couponError = document.getElementById("coupon-error");
  const easyTicketSection = document.getElementById("easy-ticket-section");
  const getTicketBtn = document.getElementById("get-ticket-btn");
  const openModal = document.getElementById("checkout-btn");
  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("close-modal");
  const contactNumber = document.getElementById("phone-number");
  const userName = document.getElementById("user-name");
  const emailId = document.getElementById("email-id");
  const dividerDisplay = document.getElementById("divider");

  let selectedSeats = [];
  let couponApplied = false;

  // update UI
  function updateUI() {
    const seatCount = selectedSeats.length;
    const contactNumberValue = contactNumber.value.trim();
    const userNameValue = userName.value.trim();
    const emailIdValue = emailId.value.trim();
    selectedSeatDisplay.textContent = seatCount;
    checkoutBtn.disabled = seatCount === 0 || contactNumberValue === "";

    // seat info
    selectedSeatInfoContainer.innerHTML = "";
    selectedSeats.forEach((seatNumber) => {
      const seatInfo = document.createElement("div");
      seatInfo.classList.add("selected-seat-info-item");
      seatInfo.textContent = seatNumber;
      selectedSeatInfoContainer.appendChild(seatInfo);
    });

    // seat number
    totalSeatNumber.textContent = `Seat: (${seatCount})`;

    // Enable or disable coupon input and apply coupon button
    if (seatCount === 4 && !couponApplied) {
      couponInput.disabled = false;
      applyCouponBtn.disabled = false;
    } else {
      couponInput.disabled = true;
      applyCouponBtn.disabled = true;
    }

    //  total price
    const totalPrice = calculateTotalPrice(seatCount);
    totalPriceDisplay.textContent = totalPrice;

    // grand total
    const grandTotal = calculateGrandTotal(totalPrice);
    grandTotalDisplay.textContent = grandTotal;
  }

  // seat selection
  function selectSeat(seat) {
    const seatNumber = seat.dataset.seat;
    const index = selectedSeats.indexOf(seatNumber);
    if (index === -1) {
      if (selectedSeats.length < 4) {
        selectedSeats.push(seatNumber);
        seat.classList.add("selected");
      } else {
        alert("You can only select up to 4 seats.");
      }
    } else {
      selectedSeats.splice(index, 1);
      seat.classList.remove("selected");
    }
    updateUI();
    //  remaining seats count
    const remainingSeats = 40 - selectedSeats.length;
    document.getElementById("remaining-seats").textContent = remainingSeats;
  }

  // Create seat columns
  for (let i = 0; i < 4; i++) {
    const seatColumn = document.createElement("div");
    seatColumn.classList.add("seat-column", "mr-4");
    seatColumnsContainer.appendChild(seatColumn);

    // Create seats for each column
    for (let j = 0; j < 10; j++) {
      const seat = document.createElement("div");
      seat.classList.add(
        "seat",
        "bg-gray-200",
        "flex",
        "justify-center",
        "items-center",
        "text-center"
      );
      const seatNumber = String.fromCharCode(65 + j); // ASCII code for 'A' is 65
      seat.dataset.seat = `${seatNumber}${i + 1}`;
      seat.textContent = `${seatNumber}${i + 1}`;
      seat.addEventListener("click", function () {
        selectSeat(seat);
        updatePaymentDetails(seat);
      });
      seatColumn.appendChild(seat);
    }
  }

  // Apply coupon
  applyCouponBtn.addEventListener("click", function () {
    const couponCode = couponInput.value.trim();
    if (couponCode === "") {
      couponError.textContent = "Please enter a coupon code.";
      return;
    }
    // Apply coupon logic here
    if (!isValidCoupon(couponCode)) {
      couponError.textContent = "Invalid coupon code. Please try again.";
      return;
    }
    applyCoupon(couponCode);
    couponApplied = true;
    couponInput.disabled = true;
    applyCouponBtn.disabled = true;
    couponInput.style.display = "none";
    applyCouponBtn.style.display = "none";
    // Clear error message
    couponError.textContent = "";
  });

  function updatePaymentDetails(seat) {
    document.getElementById("selected-seat").innerText = seat.dataset.seat;
    document.getElementById("price-per-seat").innerText = "550";
  }

  // per seat price
  function calculateTotalPrice(seatCount) {
    return seatCount * 550; // Assuming price is always 550
  }

  // grand total after discount
  function calculateGrandTotal(totalPrice) {
    if (couponApplied) {
      // Apply coupon discount here
      const couponDiscount = calculateCouponDiscount(totalPrice);
      return totalPrice - couponDiscount;
    }
    return totalPrice;
  }

  // apply coupon function
  function calculateCouponDiscount(totalPrice) {
    const couponCode = couponInput.value.trim();
    let discountAmount = 0; // Initialize discount amount
    if (couponCode === "NEW15") {
      discountAmount = totalPrice * 0.15; // 15% discount
    } else if (couponCode === "Couple 20") {
      discountAmount = totalPrice * 0.2; // 20% discount
    }
    return discountAmount;
  }

  //  coupon code validate
  function isValidCoupon(couponCode) {
    // Add your coupon validation logic here
    return couponCode === "NEW15" || couponCode === "Couple 20";
  }

  function applyCoupon(couponCode) {
    let totalPrice = parseInt(totalPriceDisplay.textContent);
    const couponDiscount = calculateCouponDiscount(totalPrice);
    const grandTotal = totalPrice - couponDiscount;
    grandTotalDisplay.textContent = grandTotal;
    discountPriceDisplay.textContent = couponDiscount;
    discountCountDisply.classList.remove("hidden");
    dividerDisplay.classList.remove("hidden");
  }

  // scrolling  Buy ticket to select ticket section
  function scrollToEasyTicketSection() {
    easyTicketSection.scrollIntoView({ behavior: "smooth" });
  }
  getTicketBtn.addEventListener("click", scrollToEasyTicketSection);

  // CLICK ON NEXT BUTTON TO OPEN POPUP
  openModal.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });
  // CLICK ON CONTINUE BUTTON TO CLOSE POPUP
  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  contactNumber.addEventListener("input", updateUI);

  // effects of after clicking on NEXT button start
  checkoutBtn.addEventListener("click", function () {
    // Unselect selected seats and update UI
    selectedSeats.forEach((seatNumber) => {
      const seat = document.querySelector(`[data-seat="${seatNumber}"]`);
      seat.classList.remove("selected");
    });
    selectedSeats = []; // Clear selected seats array
    updateUI(); // Update UI after unselecting seats

    // Reset contact number input field
    contactNumber.value = "";
    userName.value = "";
    emailId.value = "";

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
    discountCountDisply.classList.add("hidden");
    dividerDisplay.classList.add("hidden"); // Hide the discount price display
  });

  // effects of after clicking on NEXT button start
});
