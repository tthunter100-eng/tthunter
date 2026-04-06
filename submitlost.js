//global entry counter
let itemCounter = parseInt(localStorage.getItem('LibraryItemCounter')) || 0;

function getNextId() {
    itemCounter++;
    localStorage.setItem('libraryItemCounter', itemCounter);
    return itemCounter.toString().padStart(4, '0');
}

//submit a ticket div
const lostSomething = document.createElement("div");
lostSomething.innerHTML = `
<h style="font-size: 50px; font-weight: bold; margin: 0; line-height: 1;">Lost Something?<br>We Got You.</h><br>
<h style="font-size: 20px; font-weight: normal; margin: 0; line-height: 1.1;">Browse surrendered items and claim what's yours.</h><br>
<div style="height: 60px; width: 200px; top: 35px; display: flex; position: relative;">
    <button class="create-ticket-btn" id="ticket-button">
    <img src="submitticket.png" style="position: relative; height: 95%; width: 20%;" alt="icon" class="submit-ticket-icon">
    <span>Submit a ticket</span>
    </button>
</div>
`;  
Object.assign(lostSomething.style, {
    position: "absolute",
    top: "170px",
    left: "110px",
    display: "flex",
    flexDirection: "column",
})
document.querySelector(".header").appendChild(lostSomething);

//search function
const searchContainer = document.createElement("div");
searchContainer.innerHTML = `
<div style="position: relative; display: flex; align-items: center; border-radius: 40px; background-color: #ccc; height: 40px; width: 590px;">
    <img src="searchIco.png" style="height: 100%; width: 8%; margin-left: 10px; z-index: 2000;">
    <input type="text" id="search-input" placeholder="Filter list..." style="padding: 6px 30px 6px 10px; background: transparent; border: none; width: 590px; font-size: 20px; outline: none;">
    <button id="clear-search" style="position: absolute; right: 8px; background: none; border: none; cursor: pointer; color: #888; font-weight: bold; display: none;">✕</button>
</div>
    <button id="all-categories" style="border-radius: 40px; background: transparent; color: #ffffff; border-color: #ffffff; border-width: 1px; padding: 6px; width: 50px; font-weight: bold; font-size: 15px;" value="All">All</button>
    <button style="border-radius: 40px; background: transparent; color: #ffffff; border-color: #ffffff; border-width: 1px; padding: 6px; font-weight: bold; font-size: 15px;" value="Electronics">Electronics</button>
    <button style="border-radius: 40px; background: transparent; color: #ffffff; border-color: #ffffff; border-width: 1px; padding: 6px; font-weight: bold; font-size: 15px;" value="Clothing">Clothing</button>
    <button style="border-radius: 40px; background: transparent; color: #ffffff; border-color: #ffffff; border-width: 1px; padding: 6px; font-weight: bold; font-size: 15px;" value="School Supplies">School Supplies</button>
    <button style="border-radius: 40px; background: transparent; color: #ffffff; border-color: #ffffff; border-width: 1px; padding: 6px; font-weight: bold; font-size: 15px;" value="Wallet">Wallet</button>
    <button style="border-radius: 40px; background: transparent; color: #ffffff; border-color: #ffffff; border-width: 1px; padding: 6px; width: 50px; font-weight: bold; font-size: 15px;" value="ID">ID</button>
    <button style="border-radius: 40px; background: transparent; color: #ffffff; border-color: #ffffff; border-width: 1px; padding: 6px; font-weight: bold; font-size: 15px;" value="Other">Other</button>
`;

Object.assign(searchContainer.style, {
    position: "sticky",
    top: "0",
    left: "15px",
    right: "15px",
    display: "flex",
    opacity: "0.85",
    gap: "15px",
    margin: "0",
    alignItems: "center",
    backgroundColor: "#2d4f81",
    padding: "10px 10px",
    borderRadius: "40px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    zIndex: "3000",
    height: "55px",
    boxSizing: "border-box",
    overflow: "hidden",
    transition: "opacity 0.1s ease",
});
document.querySelector(".item-list-container").prepend(searchContainer);

//button flavors
function setActiveButton(activeBtn, allBtns) {
    allBtns.forEach(btn => {
        Object.assign(btn.style, {
            backgroundColor: "transparent",
            borderColor: "white",
        });
    });

    Object.assign(activeBtn.style, {
        backgroundColor: "black",
        borderColor: "white",
    });
}

const allBtns = searchContainer.querySelectorAll("button[value]");
allBtns.forEach(btn => {
    btn.addEventListener('click', () => setActiveButton(btn, allBtns))
});

//search function logic
let currentCategory = "All";
const searchInput = searchContainer.querySelector("#search-input");
const clearBtn = searchContainer.querySelector("#clear-search");
const categorySelect = searchContainer.querySelectorAll("button[value]");

const filterAndHighlight = () => {
    const query = searchInput.value.toLowerCase();
    const items = document.querySelectorAll(".item-list li");
   
    clearBtn.style.display = query.length > 0 ? "block" : "none";


    items.forEach(item => {
        if (!item.dataset.original) item.dataset.original = item.innerHTML;
        const itemCategory = item.dataset.category || "";
       
        // compute raw text excluding status badge
        let rawText = item.innerText.toLowerCase();
        const badge = item.querySelector('.status-badge');
        if (badge) {
            rawText = rawText.replace(badge.innerText.toLowerCase(), '');
        }
        const matchesCategory = currentCategory === "All" || itemCategory === currentCategory;
        const matchesQuery = rawText.includes(query);

        item.style.display = (matchesCategory && matchesQuery) ? "block" : "none";
    });
};
categorySelect.forEach(btn => {
    btn.addEventListener('click', () => {
        currentCategory = btn.getAttribute("value");
        setActiveButton(btn, categorySelect);
        filterAndHighlight();
    });
});
searchInput.oninput = filterAndHighlight;
clearBtn.onclick = () => {
    searchInput.value = "";
    filterAndHighlight();
    searchInput.focus();
};

const allCategory = document.getElementById("all-categories");
if (allCategory) {
    setActiveButton(allCategory, allBtns);
}

//search bar flavor
const searchOpacity = () => {
    setTimeout(() => {
        const isHovered = searchContainer.matches(':hover');
        const isFocused = document.activeElement === searchInput;
        const isButtonFocused = Array.from(allBtns).includes(document.activeElement);

        if (isHovered || isFocused || isButtonFocused) {
            searchContainer.style.opacity = "0.85";
        }
        else {
            searchContainer.style.opacity = "0.4";
        }
    }, 50);

    allBtns.forEach(btn => {
        btn.addEventListener('focus', searchOpacity);
        btn.addEventListener('blur', searchOpacity);
        btn.addEventListener('click', searchOpacity);
    });
};
searchContainer.onmouseenter = searchOpacity;
searchContainer.onmouseleave = searchOpacity;
searchInput.onfocus = searchOpacity;
searchInput.onblur = searchOpacity;

//testing add button
const lostButton = document.createElement("button");
lostButton.innerText="+";
Object.assign(lostButton.style, {
    borderRadius: "8px",
    padding:"12px 18px",
    color:"#000000",
    backgroundColor:"#828282",
    cursor:"pointer",
    borderWidth:"2px",
    borderStyle:"solid",
    fontSize:"24px",
    fontWeight:"bold",
    display:"flex",
    alignContent:"center",
    textAlign:"center",
    position:"relative",
    top:"-70px",
    right:"-5px",
    margin:"0",
    boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)",
});
const beforeContainer = document.querySelector(".item-list-container");
beforeContainer.parentNode.insertBefore(lostButton, beforeContainer);

//popup
const popupLost = document.createElement("div");
popupLost.innerHTML = `
<div style="position: fixed; border-radius: 20px; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80%; height: 70%; display: flex; flex-direction: column; background-color: white; z-index: 2000; overflow: hidden; gap: 15px;">
    <div style="background-color: #0668c0; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px; padding: 10px; position: relative;">
        <button id="close-lost" style="position: absolute; left: 15px; background: none; border: none; cursor: pointer; font-weight: bold; font-size: 24px; color: white;">←</button>
        What and when was this item surrendered?
    </div>
    <div style="position: relative; display: flex; flex-direction: column; background: none; gap: 20px; margin-left: 30px; margin-top: 20px; align-items: left;">
        <form action="placeholder.php" method="get" id="lost-query">
            <label for="itemname">Item Name</label><br>
            <input type="text" id="item-name" name="itemname" style="padding: 5px 5px; height: 20px; width: 95%; background-color: #d9d9d9; color: black; border-radius: 20px; border: none;" required><br><br>
            <label for="itemdesc">Item Description</label><br>
            <input type="text" id="item-desc" name="itemdesc" style="padding: 5px 5px; height: 20px; width: 95%; background-color: #d9d9d9; color: black; border-radius: 20px; border: none;" required><br><br>
            <label for="personname">Surrendered by:</label><br>
            <input type="text" id="person-name" name="personname" style="padding: 5px 5px; height: 20px; width: 95%; background-color: #d9d9d9; color: black; border-radius: 20px; border: none;" required><br><br>
            <label for="itemtype">Item Type</label><br>
            <select id="item-type" name="itemtype" style="border-radius: 20px; border-color: #0668c0; padding: 5px 5px; height: 30px; width: auto; align-items: center;" required>
                <option value="" disabled selected>Select item type</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="School Supplies">School Supplies</option>
                <option value="Wallet">Wallet</option>
                <option value="ID">ID</option>
                <option value="Other">Other</option>
            </select><br><br>
            <label for="itemdate">Date Received</label><br>
            <input type="date" id="item-date" name="itemdate" style="background-color: white; border-radius: 20px; border-color: #0668c0; height: 20px; width: auto; padding: 5px 5px;" required>
            <button type="submit" id="submit-lost" style="position: absolute; bottom: 0%; right: 0%; transform: translate(-40%,-50%); background-color: #828282; border-width: 2px; border-style: solid; border-color: #000000; padding: 5px 20px; font-size: 15px; cursor: pointer;">Log</button>
        </form>
    </div>
</div>`;

Object.assign(popupLost.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "none",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "2000"
});

document.body.appendChild(popupLost);
lostButton.onclick = () => {
    popupLost.style.display = "flex";
    document.body.style.overflow = "hidden";
};
popupLost.querySelector("#close-lost").onclick = () => {
    popupLost.style.display = "none";
    document.body.style.overflow = "auto";
};

popupLost.querySelector("#submit-lost").onclick = event => {
    event.preventDefault();
    const titleInput = document.getElementById("item-name")
    const descInput = document.getElementById("item-desc");
    const nameInput = document.getElementById("person-name");
    const dateInput = document.getElementById("item-date");
    const typeInput = document.getElementById("item-type");
   
    if (!titleInput.checkValidity() || !descInput.checkValidity() || !dateInput.checkValidity() || !typeInput.checkValidity() || !nameInput.checkValidity()) {
        titleInput.checkValidity() || descInput.reportValidity() || dateInput.reportValidity() || typeInput.reportValidity() || nameInput.reportValidity();
        return;
    }

    // item logging with status
    const newItem = document.createElement("li");
    const entryId = getNextId();
    newItem.dataset.id = entryId;
    newItem.dataset.category = typeInput.value;
    Object.assign(newItem.style, {
        padding: "5px 5px",
        position: "relative",
        listStyle: "none",
    });
    newItem.innerHTML = `
        <div style="display: flex; flex-direction: row; height: 80px; width: 100%; gap: 0;">
            <div style="width: 50%; height: 100%; margin-bottom: 8px; padding: 3px;">
                <span style="font-weight: 900; font-size: 30px;">${entryId.slice(-4)}</span>
            </div>
            <div style="width: 75%; height: 100%; margin-bottom: 8px; padding: 3px; align-items: center; margin-top: 10px;">
                <span style="font-weight: bold; font-size: 20px; text-align: right; margin-right: 15px;">${titleInput.value}</span>
            </div>
        </div>
        <div style="height: 50px; font-size: 16px; color: #b0b0b0; line-height: 1.4; text-align: center; padding: 3px; width: 100%;">
            ${descInput.value || "No additional details"}
        </div>
    `;
    
    // close dropdown when clicking outside
    document.addEventListener('click', () => {
        dropdown.style.display = 'none';
    });

    const itemList = document.querySelector(".item-list");
    itemList.appendChild(newItem);

    document.getElementById("lost-query").reset();
    popupLost.style.display = "none";
    document.body.style.overflow = "auto";
};

window.addEventListener('keydown', event => {
    if (event.key === "Enter") {
        if (popupLost.style.display === "flex") {
            const titleInput = document.getElementById("item-name");
            const descInput = document.getElementById("item-desc")
            const nameInput = document.getElementById("person-name");
            const dateInput = document.getElementById("item-date");
            const submitBtn = document.getElementById("submit-lost");

            if (document.activeElement === titleInput) {
                event.preventDefault();
                descInput.focus();
            }
            else if (document.activeElement === descInput) {
                event.preventDefault();
                nameInput.focus();
            }
            else if (document.activeElement === nameInput) {
                event.preventDefault();
                dateInput.focus();
            }
            else if (document.activeElement === dateInput) {
                event.preventDefault();
                submitBtn.focus();
            }
            else {
                submitBtn.click();
            }
        }

        if (ticketPage.style.display === "flex") {
            const ticket = document.getElementById("submit-ticket");

            if (document.activeElement === ItemName) {
                event.preventDefault();
                ItemDesc.focus();
            }
            else if (document.activeElement === ItemDesc) {
                event.preventDefault();
                ItemLoc.focus();
            }
            else if (document.activeElement === ItemLoc) {
                event.preventDefault();
                ticket.focus();
            }
            else {
                ticket.click();
            }
        }
    }
});

window.addEventListener('keydown', event => {
    if (event.key === "Escape") {
        if (popupLost.style.display === "flex") {
            popupLost.style.display = "none";
            document.body.style.overflow = "auto";
        }
        if (ticketPage.style.display === "flex") {
            ticketPage.style.display = "none";
            document.body.style.overflow = "auto";
        }
        if (warning.style.display === "flex") {
            warning.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }
});

//for submit ticket
const ticketPage = document.createElement("div");
ticketPage.innerHTML = `
<div style="position: fixed; border-radius: 20px; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80%; height: 70%; display: flex; flex-direction: column; background-color: white; z-index: 2000; overflow: hidden; gap: 15px;">
    <div style="background-color: #0668c0; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px; padding: 15px; position: relative;">
        <button id="close-ticket" style="position: absolute; left: 15px; background: none; border: none; cursor: pointer; font-weight: bold; font-size: 24px; color: white;">←</button>
        Want to claim your lost item? Submit a ticket!
    </div>
    <div id="ticket-form-container" style="padding: 20px; flex-grow: 1; overflow-y: auto; color: #333; align">
        <form id="ticket-form" style="display: flex; flex-direction: column; gap: 30px;">
        <label style="display: flex; flex-direction: column;">Item Name:
            <input type="text" id="ItemName" style="margin-top: 5px; background-color: #d9d9d9; border-radius: 20px; border-width: 0px; height: 25px; width: 90%; padding: 3px 10px;" required>
        </label>
           
        <label style="display: flex; flex-direction: column;">Description:
            <textarea id="ItemDesc" style="margin-top: 5px; background-color: #d9d9d9; border-radius: 20px; border-width: 0px; height: 50px; width: 90%; padding: 10px; font-family: sans-serif;" required></textarea>
        </label>

        <label style="display: flex; flex-direction: column;">Item Brand (Optional):
            <input type="text" id="ItemBrand" style="margin-top: 5px; background-color: #d9d9d9; border-radius: 20px; border-width: 0px; height: 25px; width: 90%; padding: 3px 10px;">
        </label>
           
        <label style="display: flex; flex-direction: column;">Last Known Location:
            <input type="text" id="ItemLoc" style="margin-top: 5px; background-color: #d9d9d9; border-radius: 20px; border-width: 0px; height: 25px; width: 90%; padding: 3px 10px;" required>
        </label>

        <label style="display: flex; flex-direction: column;">Date Lost:
            <input type="date" id="ItemDate" style="margin-top: 5px; background-color: #d9d9d9; border-radius: 20px; border-width: 0px; height: 25px; width: 90%; padding: 3px 10px;" required>
        </label>

        <label style="display: flex; flex-direction: column;">Picture of the Item (Optional):
            <input type="file" id="ItemPic" accept="image/*" style="margin-top: 5px; background-color: #d9d9d9; border-radius: 20px; border-width: 0px; height: 25px; width: 90%; padding: 3px 10px;">
        </label>

        <label style="display: flex; flex-direction: column; font-weight: bold; font-size: 18px;">Personal Information:</label>

        <label style="display: flex; flex-direction: column;">Full Name (Last name, First name MI.):
            <input type="text" id="FullName" style="margin-top: 5px; background-color: #d9d9d9; border-radius: 20px; border-width: 0px; height: 25px; width: 90%; padding: 3px 10px;" required>
        </label>

        <label style="display: flex; flex-direction: column;">Role in School:
            <select id="Role" style="margin-top: 5px; background-color: #d9d9d9; border-radius: 20px; border-width: 0px; height: 30px; width: 90%; padding: 3px 10px;" required>
                <option value="" disabled selected>Select your role</option>
                <option value="Student">Student</option>
                <option value="Professor">Professor</option>
                <option value="Staff">Staff</option>
                <option value="Other">Other</option>
            </select>
        </label>

        <label style="display: flex; flex-direction: column;">Student Number(if applicable):
            <input type="text" id="StudentNum" style="margin-top: 5px; background-color: #d9d9d9; border-radius: 20px; border-width: 0px; height: 25px; width: 90%; padding: 3px 10px;">
        </label>

        <label style="display: flex; flex-direction: column;">Contact Number:
            <input type="tel" id="ContactNum" style="margin-top: 5px; background-color: #d9d9d9; border-radius: 20px; border-width: 0px; height: 25px; width: 90%; padding: 3px 10px;" required>
        </label>

        <label style="display: flex; flex-direction: column;">School ID for Verification:
            <input type="file" id="ItemID" accept="image/*" style="margin-top: 5px; background-color: #d9d9d9; border-radius: 20px; border-width: 0px; height: 25px; width: 90%; padding: 3px 10px;" required>
        </label>

        <button type="submit" id="submit-ticket" style="background-color: #0668c0; color: white; border-radius: 20px; height: 50px; width: 150px; padding: 3px 10px; align-items: center; justify-content: center; color: white; border-color: #0668c0; cursor: pointer; transition: background 0.2s ease; font-size: 17px;">Submit Ticket</button>
        </form>
    </div>
</div>`;
Object.assign(ticketPage.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "none",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "2000",
});
document.body.appendChild(ticketPage);
const ticketOut = document.getElementById("close-ticket");
const lostOut = document.getElementById("close-lost");

//show submit ticket page
const submitTicket = document.getElementById("ticket-button");
submitTicket.onclick = () => {
    ticketPage.style.display = "flex";
    document.body.style.overflow = "hidden";
};

//close add item
lostOut.onmouseenter = () => {
    lostOut.innerText = "Close";
    lostOut.style.fontSize = "20px";
};
lostOut.onmouseleave = () => {
    lostOut.innerText = "←";
    lostOut.style.fontSize = "24px";
};

//close submit ticket page
ticketOut.onclick = () => {
    ticketPage.style.display = "none";
    document.body.style.overflow = "auto";
};
ticketOut.onmouseenter = () => {
    ticketOut.innerText = "Close";
    ticketOut.style.fontSize = "20px";
};
ticketOut.onmouseleave = () => {
    ticketOut.innerText = "←";
    ticketOut.style.fontSize = "24px";
};


let submittedTickets = [];
const itemListContainerMain = document.querySelector(".item-list-container");

// ticket inbox container
const ticketInboxContainer = document.createElement("div");


ticketInboxContainer.className = "item-list-container ticket-inbox-container";
Object.assign(ticketInboxContainer.style, {
    
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: "100vh",
    position: "relative"
});
// hide initially
ticketInboxContainer.style.display = "none";
ticketInboxContainer.innerHTML = `
    <h2>Ticket Inbox</h2>
    <button id="back-to-logbook" style="padding: 8px 20px; background-color: #828282; color: #000000; border: 2px solid #000000; border-radius: 8px; cursor: pointer; font-weight: bold; position:absolute; top:20px; right:20px;">Back to Item Catalogue</button>
    <ul id="tickets-list" class="item-list" style="margin-top:40px; width:100%;"></ul>
`;

// logbook container
const logbookContainer = document.createElement("div");
logbookContainer.className = "item-list-container logbook-container";
Object.assign(logbookContainer.style, {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: "100vh",
    position: "relative"
});
logbookContainer.style.display = "none";
logbookContainer.innerHTML = `
    <h2>Logbook</h2>
    <button id="back-from-logbook" style="padding: 8px 20px; background-color: #828282; color: #000000; border: 2px solid #000000; border-radius: 8px; cursor: pointer; font-weight: bold; position:absolute; top:20px; right:20px;">Back to Item Catalogue</button>
    <ul id="logbook-list" class="item-list" style="margin-top:40px; width:100%;"></ul>
`;

const mainContent = document.querySelector('.main-content');
if (mainContent) {
    mainContent.appendChild(ticketInboxContainer);
    mainContent.appendChild(logbookContainer);
} else {
    document.body.appendChild(ticketInboxContainer);
    document.body.appendChild(logbookContainer);
}

function addTicketToInbox(ticket) {
    const ticketsList = document.getElementById("tickets-list");
    const li = document.createElement("li");
    li.innerHTML = `
        <div style="font-weight:bold; font-size:18px; color:#0668c0; margin-bottom:8px;">${ticket.itemName}</div>
        <div><strong>Description:</strong> ${ticket.itemDesc}</div>
        <div><strong>Brand:</strong> ${ticket.itemBrand || 'N/A'}</div>
        <div><strong>Last Location:</strong> ${ticket.itemLoc}</div>
        <div><strong>Date Lost:</strong> ${ticket.itemDate}</div>
        <div><strong>Claimant:</strong> ${ticket.fullName} (${ticket.role})</div>
        <div><strong>Contact:</strong> ${ticket.contactNum}</div>
        <div><strong>Student ID:</strong> ${ticket.studentNum || 'N/A'}</div>
        <div><strong>Submitted:</strong> ${ticket.submittedDate}</div>
        <div style="position:absolute; top:10px; right:10px;"><span style="padding:5px 10px; background:#acfc79; border-radius:5px; font-size:12px;">${ticket.status}</span></div>
    `;
    ticketsList.appendChild(li);
}


ticketPage.querySelector("#submit-ticket").onclick = event => {
    event.preventDefault();

    const itemName = document.getElementById("ItemName");
    const itemDesc = document.getElementById("ItemDesc");
    const itemBrand = document.getElementById("ItemBrand");
    const itemLoc = document.getElementById("ItemLoc");
    const itemDate = document.getElementById("ItemDate");
    const fullName = document.getElementById("FullName");
    const role = document.getElementById("Role");
    const studentNum = document.getElementById("StudentNum");
    const contactNum = document.getElementById("ContactNum");
    const itemID = document.getElementById("ItemID");

    if (!itemName.checkValidity() || !itemDesc.checkValidity() || !itemLoc.checkValidity() || 
        !itemDate.checkValidity() || !fullName.checkValidity() || !role.checkValidity() || !contactNum.checkValidity() || !itemID.checkValidity()) {
        itemName.reportValidity() || itemDesc.reportValidity() || itemLoc.reportValidity() || 
        itemDate.reportValidity() || fullName.reportValidity() || role.reportValidity() || contactNum.reportValidity() || itemID.reportValidity();
        return;
    }

  
    const ticket = {
        id: Date.now(),
        itemName: itemName.value,
        itemDesc: itemDesc.value,
        itemBrand: itemBrand.value,
        itemLoc: itemLoc.value,
        itemDate: itemDate.value,
        fullName: fullName.value,
        role: role.value,
        studentNum: studentNum.value,
        contactNum: contactNum.value,
        submittedDate: new Date().toLocaleDateString(),
        status: "Pending"
    };


    submittedTickets.push(ticket);

    addTicketToInbox(ticket);

  
    document.getElementById("ticket-form").reset();
    ticketPage.style.display = "none";
    document.body.style.overflow = "auto";
};
