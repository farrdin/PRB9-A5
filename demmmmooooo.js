const seats = document.getElementsByClassName("column-label");

for (const seatNum of seats) {
  seatNum.addEventListener("click", function (event) {
    const seatName = event.target.innerText;
    const seatClass = "Economy";
    const seatPrice = 550;

    const displaySeatInfo = document.getElementById("selected-seat-info");
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

    displaySeatInfo.appendChild(div);
  });
}
