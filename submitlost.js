//search button
const searchButton = document.createElement("button");
const searchIcon = document.createElement("img");
searchIcon.src = "SearchIco.png";
searchIcon.style.width = "30px";      
searchIcon.style.height = "30px";


searchButton.appendChild(searchIcon);


Object.assign(searchButton.style, {
    padding:"8px 20px",
    color:"#000000",
    cursor:"pointer",
    borderWidth:"2px",
    borderStyle:"solid",
    fontSize:"15px",
    fontWeight:"normal",
    position:"absolute",
    top:"-60px",
    left:"5px",
    margin:"0",
    borderRadius:"8px",
    boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
});
document.querySelector(".item-list-container").appendChild(searchButton);


//search buton pop-up
const searchContainer = document.createElement("div");
searchContainer.innerHTML = `
    <select id="search-category" style="padding: 6px; border-radius: 8px; border: 1px solid #ccc; cursor: pointer; font-size: 13px;">
        <option value="All">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="School Supplies">School Supplies</option>
        <option value="Wallet">Wallet</option>
        <option value="ID">ID</option>
        <option value="Other">Other</option>
    </select>
    <div style="position: relative; display: flex; align-items: center;">
        <input type="text" id="search-input" placeholder="Filter list..." style="padding: 6px 30px 6px 10px; border-radius: 8px; border: 1px solid #ccc; width: 140px; font-size: 13px;">
        <button id="clear-search" style="position: absolute; right: 8px; background: none; border: none; cursor: pointer; color: #888; font-weight: bold; display: none;">✕</button>
    </div>
`;


Object.assign(searchContainer.style, {
    position: "absolute",
    top: "-50px",
    left: "85px",
    display: "none",
    gap: "8px",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: "5px 10px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    zIndex: "1000",
    border: "1px solid #ddd"
});
document.querySelector(".item-list-container").appendChild(searchContainer);


//edit button
const editButton = document.createElement("button");
editButton.innerText="Edit";
Object.assign(editButton.style, {
    padding:"8px 20px",
    color:"#000000",
    backgroundColor:"#828282",
    cursor:"pointer",
    borderWidth:"2px",
    borderStyle:"solid",
    fontSize:"15px",
    fontWeight:"normal",
    display:"flex",
    alignContent:"center",
    textAlign:"center",
    position:"absolute",
    top:"-40px",
    right:"0px",
    margin:"0",
    borderRadius:"8px",
    boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)",
});
document.querySelector(".item-list-container").appendChild(editButton);


//button
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
    display:"none",
    alignContent:"center",
    textAlign:"center",
    position:"absolute",
    top:"-70px",
    right:"-5px",
    margin:"0",
    boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)",
});
document.querySelector(".item-list").appendChild(lostButton);

//search button logic
let isSearchOpen = false;
const searchInput = searchContainer.querySelector("#search-input");
const categorySelect = searchContainer.querySelector("#search-category");
const clearBtn = searchContainer.querySelector("#clear-search");

const filterAndHighlight = () => {
    const category = categorySelect.value;
    const query = searchInput.value.toLowerCase();
    const items = document.querySelectorAll(".item-list li");
   
    clearBtn.style.display = query.length > 0 ? "block" : "none";


    items.forEach(item => {
        if (!item.dataset.original) item.dataset.original = item.innerHTML;
       
        // compute raw text excluding status badge
        let rawText = item.innerText.toLowerCase();
        const badge = item.querySelector('.status-badge');
        if (badge) {
            rawText = rawText.replace(badge.innerText.toLowerCase(), '');
        }
        const matchesCategory = category === "All" || rawText.includes(category.toLowerCase());
        const matchesQuery = rawText.includes(query);

        if (matchesCategory && matchesQuery) {
            item.style.display = "block";
            item.innerHTML = item.dataset.original;
        } else {
            item.style.display = "none";
        }
    });
};


searchButton.onclick = () => {
    isSearchOpen = !isSearchOpen;
    searchContainer.style.display = isSearchOpen ? "flex" : "none";
};


searchInput.oninput = filterAndHighlight;
categorySelect.onchange = filterAndHighlight;
clearBtn.onclick = () => {
    searchInput.value = "";
    filterAndHighlight();
    searchInput.focus();
};


//for edit button
let isEditing=false;
editButton.onclick = () => {
    const allDeleteButtons = document.querySelectorAll(".deleteButton");
    isEditing=!isEditing;
    if (isEditing) {
        editButton.innerText="Done";
        editButton.style.backgroundColor="#acfc79";
        editButton.style.borderWidth="0px";
        lostButton.style.display="flex";
        allDeleteButtons.forEach(btn => btn.style.display = "block");
        deleteItem="null";
    }
    else {
        editButton.innerText="Edit";
        editButton.style.color="#000000";
        editButton.style.backgroundColor="#828282";
        editButton.style.borderWidth="2px";
        lostButton.style.display="none";
        allDeleteButtons.forEach(btn => btn.style.display = "none");
        deleteItem="null";
    }
};


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
            <label for="itemname">Item Description</label><br>
            <input type="text" id="item-name" name="itemname" style="padding: 5px 5px; height: 20px; width: 95%; background-color: #d9d9d9; color: black; border-radius: 20px; border: none;" required><br><br>
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
lostButton.onclick = () =>  {
    popupLost.style.display = "flex";
    document.body.style.overflow = "hidden";
};
popupLost.querySelector("#close-lost").onclick = () => {
    popupLost.style.display = "none";
    document.body.style.overflow = "auto";
};

const warning = document.createElement("div");
document.body.appendChild(warning);
let deleteItem = null;

popupLost.querySelector("#submit-lost").onclick = event => {
    event.preventDefault();


    const descInput = document.getElementById("item-name");
    const nameInput = document.getElementById("person-name");
    const dateInput = document.getElementById("item-date");
    const typeInput = document.getElementById("item-type");
   
    if (!descInput.checkValidity() || !dateInput.checkValidity() || !typeInput.checkValidity() || !nameInput.checkValidity()) {
        descInput.reportValidity() || dateInput.reportValidity() || typeInput.reportValidity() || nameInput.reportValidity();
        return;
    }

    //delete warning
    warning.innerHTML = `
    <div style="padding: 20px 40px; text-align: center; align-content: center; justify-content: center; position: fixed; display: flex; flex-direction: column; border-radius: 20px; background-color: white; color: black; font-weight: bold; font-size: 24px; top: 50%; left: 50%; transform: translate(-50%, -50%); height: auto; min-height: 30%; width: 80%; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);">Deleting this item would also remove it from the logbook.<br> Do you wish to proceed?
        <div style="display: flex; flex-direction: row; gap: 50px; margin-top: 30px; justify-content: center; position: relative; background: none; padding: 10px 20px; width: 100%">
            <button id="close-delete" style="cursor: pointer; display: flex; padding: 8px 20px; color: black; background-color: gray; font-size: 20px; border: none; border-radius: 8px;">Cancel</button>
            <button id="proceed-delete" style="cursor: pointer; display: flex; padding: 8px 20px; color: white; background-color: blue; font-size: 20px; border: none; border-radius: 8px;">Proceed</button>
            </div>
    </div>`;
    Object.assign(warning.style, {
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
    warning.querySelector("#close-delete").onclick = event => {
        warning.style.display = "none";
        document.body.style.overflow = "auto";
        deleteItem = null;
    };
    warning.querySelector("#proceed-delete").onclick = event => {
        if (deleteItem) {
            const id = deleteItem.dataset.id;
            deleteItem.remove();
            // also remove from logbook if present
            if (id) {
                const logEntry = document.querySelector(`#logbook-list li[data-id="${id}"]`);
                if (logEntry) logEntry.remove();
            }
            deleteItem = null;
        }
        warning.style.display = "none";
        document.body.style.overflow = "auto";

    };

    // item logging with status
    const newItem = document.createElement("li");
    const entryId = Date.now().toString();
    newItem.dataset.id = entryId;
    Object.assign(newItem.style, {
        padding: "5px 0",
        position: "relative",
        listStyle: "none",
    });
    newItem.innerHTML = `
        <strong>${descInput.value}</strong> - <small>${dateInput.value}, ${typeInput.value}</small>
        <span class="status-badge" style="margin-left:10px; padding:2px 8px; border-radius:4px; background:green; color:#fff; cursor:pointer; font-size:12px; position:relative;">to receive</span>
        <ul class="status-dropdown" style="display:none; position:absolute; top:120%; left:0; background:#fff; border:1px solid #ccc; list-style:none; padding:0; margin:0; z-index:1000; min-width:80px;">
            <li style="padding:5px; cursor:pointer;">to receive</li>
            <li style="padding:5px; cursor:pointer;">received</li>
        </ul>
        <button class="deleteButton" style="cursor: pointer; right: 5px; top: 50%; transform: translateY(-50%); padding: 2px 2px; position: absolute; display: block; background-color: red; color: white; border-width: 3px; border: red; border-radius: 8px; height: 27px; width: 30px;">
            <img class="delete-icon" src="delete icon.png" style="object-fit: contain; height: 100%; width: 100%;"></button>
    `;
    // status logic
    const badge = newItem.querySelector('.status-badge');
    const dropdown = newItem.querySelector('.status-dropdown');
    badge.onclick = e => {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
        dropdown.style.flexDirection = 'column';
    };
    dropdown.querySelectorAll('li').forEach(li => {
        li.onclick = e => {
            const val = li.textContent;
            if (val === 'received') {
                // show warning for status change to received
                const statusWarning = document.createElement("div");
                statusWarning.innerHTML = `
                    <div style="padding: 20px 40px; text-align: center; align-content: center; justify-content: center; position: fixed; display: flex; flex-direction: column; border-radius: 20px; background-color: white; color: black; font-weight: bold; font-size: 24px; top: 50%; left: 50%; transform: translate(-50%, -50%); height: auto; min-height: 30%; width: 80%; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);">
                        Changing to this status removes it from the catalogue, but will remain logged in the logbook.<br>
                        <div style="display: flex; flex-direction: row; gap: 50px; margin-top: 30px; justify-content: center; position: relative; background: none; padding: 10px 20px; width: 100%">
                            <button id="cancel-status" style="cursor: pointer; display: flex; padding: 8px 20px; color: black; background-color: gray; font-size: 20px; border: none; border-radius: 8px;">Cancel</button>
                            <button id="confirm-status" style="cursor: pointer; display: flex; padding: 8px 20px; color: white; background-color: blue; font-size: 20px; border: none; border-radius: 8px;">I understand</button>
                        </div>
                    </div>
                `;
                Object.assign(statusWarning.style, {
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: "3000"
                });
                document.body.appendChild(statusWarning);
                document.body.style.overflow = "hidden";

                statusWarning.querySelector("#cancel-status").onclick = () => {
                    statusWarning.remove();
                    document.body.style.overflow = "auto";
                };
                statusWarning.querySelector("#confirm-status").onclick = () => {
                    // apply status change
                    badge.textContent = val;
                    badge.style.background = 'blue';
                    // sync to logbook
                    const id = newItem.dataset.id;
                    if (id) {
                        const logEntry = document.querySelector(`#logbook-list li[data-id="${id}"]`);
                        if (logEntry) {
                            const logBadge = logEntry.querySelector('.status-badge');
                            if (logBadge) {
                                logBadge.textContent = val;
                                logBadge.style.background = 'blue';
                            }
                        }
                    }
                    // remove from catalogue
                    newItem.remove();
                    statusWarning.remove();
                    document.body.style.overflow = "auto";
                };
            } else {
                // normal status change for 'to receive'
                badge.textContent = val;
                badge.style.background = 'green';
                // sync to logbook
                const id = newItem.dataset.id;
                if (id) {
                    const logEntry = document.querySelector(`#logbook-list li[data-id="${id}"]`);
                    if (logEntry) {
                        const logBadge = logEntry.querySelector('.status-badge');
                        if (logBadge) {
                            logBadge.textContent = val;
                            logBadge.style.background = 'green';
                        }
                    }
                }
            }
            dropdown.style.display = 'none';
        };
    });
    // close dropdown when clicking outside
    document.addEventListener('click', () => {
        dropdown.style.display = 'none';
    });
    newItem.querySelector(".deleteButton").onclick = event => {
        deleteItem = newItem;
        warning.style.display = "flex";
        document.body.style.overflow = "hidden";
    };

    const itemList = document.querySelector(".item-list");
    itemList.appendChild(newItem);

    // also mirror to logbook list
    const logbookList = document.getElementById('logbook-list');
    if (logbookList) {
        const logItem = newItem.cloneNode(true);
        // remove delete button from logbook entry
        const del = logItem.querySelector('.deleteButton');
        if (del) del.remove();
        logItem.dataset.id = entryId;
        logbookList.appendChild(logItem);
    }

    document.getElementById("lost-query").reset();
    popupLost.style.display = "none";
    document.body.style.overflow = "auto";
};

//three bar dropdown
const dropdown = document.createElement("button");
dropdown.innerText="☰";
Object.assign(dropdown.style, {
    padding: "6px 18px",
    fontWeight: "bold",
    backgroundColor: "#000",
    color: "#fff",
    cursor: "pointer",
    borderWidth: "0px",
    fontSize: "30px",
    display: "flex",
    position: "absolute",
    alignContent: "center",
    right: "40px",
});
document.querySelector(".header").appendChild(dropdown);

//dropdown popup
const dropdownPopup = document.createElement("div");
dropdownPopup.innerHTML = `
<div style="display: flex; flex-direction: column; gap: 0px; width: 100%;">
    <div class="header-buttons">
        <img class="button-icon" src="Ticket.png">
        <button class="create-ticket-btn" id="ticket-button">Submit Ticket</button>
    </div>
    <div class="button-line"></div>
    <div class="header-buttons">
        <img class="button-icon" src="Login.png">
        <button class="login-btn" id="login-button">Log In</button>
    </div>
</div>`;
Object.assign(dropdownPopup.style, {
    borderWidth: "0px",
    borderRadius: "10px",
    padding: "10px 10px",
    backgroundColor: "black",
    top: "110%",
    right: "50px",
    color: "#fff",
    display: "none",
    position: "absolute",
    zIndex: "2000",
});
document.querySelector(".header").appendChild(dropdownPopup);

let isDown = false;
dropdown.onclick = event => {
    isDown=!isDown;
    dropdownPopup.style.display=isDown ? "flex" : "none";
};
window.addEventListener('click', event => {
    if (isDown && event.target !== dropdown && !dropdownPopup.contains(event.target) && !loginPage.contains(event.target)) {
        isDown = false;
        dropdownPopup.style.display = "none";
    }
});
window.addEventListener('keydown', event => {
    if (event.key === "Enter") {
        if (popupLost.style.display === "flex") {
            const descInput = document.getElementById("item-name");
            const nameInput = document.getElementById("person-name");
            const dateInput = document.getElementById("item-date");
            const submitBtn = document.getElementById("submit-lost");

            if (document.activeElement === descInput) {
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

        if (loginPage.style.display === "flex") {
            const login = document.getElementById("submit-login");

            if (document.activeElement === adminUser) {
                event.preventDefault();
                adminPass.focus();
            }
            else if (document.activeElement === adminPass) {
                event.preventDefault();
                login.focus();
            }
            else {
                login.click();
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
        if (loginPage.style.display === "flex") {
            loginPage.style.display = "none";
            document.body.style.overflow = "auto";
            document.getElementById("login-query").reset();
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

//flavor
const wholeButton = dropdownPopup.querySelectorAll(".header-buttons");
wholeButton.forEach(container => {
    const btn = container.querySelector("button");
    const icon = container.querySelector(".button-icon");

    container.onmouseenter = () => {
        if (icon) icon.style.filter = "brightness(0) invert(1) brightness(10)";
        if (icon) icon.style.transition = "filter 0.1s ease";
        btn.style.backgroundColor = "#0056b3";
        btn.style.color = "white";
    };

    container.onmouseleave = () => {
        if (icon) icon.style.filter = "none";
        btn.style.backgroundColor = "#000";
        btn.style.color = "rgb(167, 167, 167)"
    };
});

//for login button
const logAdmin = document.getElementById("login-button");
const loginPage = document.createElement("div");
loginPage.innerHTML = `
<div style="position: fixed; border-radius: 20px; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80%; height: 70%; display: flex; justify-content: center; align-items: center; z-index: 2000; background-color: white;">
    <div style="position: absolute; background-color: #0668c0; color: white; justify-content: center; display: flex; align-items: center; font-weight: bold; font-size: 26px; width: 97%; height: 5%; top: 10px; left: 50%; transform: translateX(-50%); padding: 10px 0px; border-radius: 20px; border-width: 10px;">LOG IN AS ADMIN
    <button id="close-login" style="position: absolute; top: 45%; transform: translateY(-49%); left: 15px; background: none; border: none; cursor: pointer; font-weight: bold; font-size: 24px; color: white;">←</button></div>
    <form id="login-query" style="margin-top: 20px; align-items: center; display: flex; flex-direction: column; gap: 20px;">
        <div style="display: flex; align-items: center; justify-items: flex-end: width: 100%; gap: 10px;">
            <label for="admin-user">USERNAME:</label>
            <input type="text" style="background-color: #d9d9d9; border-radius: 20px; border-width: 0px; height: 25px; width: 180px; padding: 3px 10px; align-items: center; justify-content: center;" id="admin-username" required>
        </div>
        <div style="display: flex; align-items: center; justify-items: flex-end: width: 100%; gap: 10px;">
            <label for="admin-password">PASSWORD:</label>
            <input type="password" style="background-color: #d9d9d9; border-radius: 20px; border-width: 0px; height: 25px; width: 180px; padding: 3px 10px; align-items: center; justify-content: center;" id="admin-password" required>
        </div>
        <button type="submit" id="submit-login" style="background-color: #0668c0; border-radius: 20px; height: 30px; width: 100px; padding: 3px 10px; align-items: center; justify-content: center; color: white; border-color: #0668c0; cursor: pointer; transition: background 0.2s ease;">LOG IN</button>
    </form>
</div>`;
Object.assign(loginPage.style, {
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
document.body.appendChild(loginPage);
const loginOut = document.getElementById("close-login");
const adminUser = document.getElementById("admin-username");
const adminPass = document.getElementById("admin-password");

//show login page
logAdmin.onclick = event => {
    loginPage.style.display = "flex";
    document.body.style.overflow = "hidden";
};

//close login page
loginOut.onclick = () => {
    loginPage.style.display = "none";
    document.body.style.overflow = "auto";
};

loginOut.onmouseenter = () => {
    loginOut.innerText = "Close";
    loginOut.style.fontSize = "20px";
};
loginOut.onmouseleave = () => {
    loginOut.innerText = "←";
    loginOut.style.fontSize = "24px";
};

loginPage.querySelector("#submit-login").onclick = event => {
    event.preventDefault();

    if (!adminUser.checkValidity()) {
        adminUser.reportValidity();
        return;
    }
    if (!adminPass.checkValidity()) {
        adminPass.reportValidity();
        return;
    }

    document.getElementById("login-query").reset();
    loginPage.style.display = "none";
    document.body.style.overflow = "auto";
    dropdownPopup.style.display = "none";
};
//for submit ticket
const submitTicket = document.getElementById("ticket-button");
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


document.getElementById("back-to-logbook").onclick = () => {
    ticketInboxContainer.style.display = "none";
    logbookContainer.style.display = "none";
    itemListContainerMain.style.display = "block";
};

// back from logbook
if (document.getElementById("back-from-logbook")) {
    document.getElementById("back-from-logbook").onclick = () => {
        logbookContainer.style.display = "none";
        itemListContainerMain.style.display = "block";
    };
}

// Sidebar shiiiii
const sidebarTrigger = document.createElement("div");
Object.assign(sidebarTrigger.style, {
    position: "fixed",
    display: "flex",
    left: "0",
    top: "0",
    width: "10px",
    height: "100%",
    backgroundColor: "transparent",
    zIndex: "1999"
});
document.body.appendChild(sidebarTrigger);

const sidebar = document.createElement("div");
sidebar.innerHTML = `
    <div style="font-weight: bold; font-size: 18px; margin-bottom: 20px; color: #333;">Admin Pages</div>
    <button id="sidebar-logbook" style="width: 100%; padding: 10px; margin-bottom: 10px; background-color: #0668c0; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px;">Logbook</button>
    <button id="sidebar-ticket" style="width: 100%; padding: 10px; margin-bottom: 10px; background-color: #0668c0; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px;">Ticket inbox</button>
    <button id="sidebar-catalogue" style="width: 100%; padding: 10px; margin-bottom: 10px; background-color: #0668c0; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px;">Item Catalogue</button>
`;
sidebar.style.position = "fixed";
sidebar.style.left = "-200px";
sidebar.style.top = "0";
sidebar.style.width = "200px";
sidebar.style.height = "100%";
sidebar.style.backgroundColor = "lightgray";
sidebar.style.transition = "left 0.3s";
sidebar.style.zIndex = "1999";
sidebar.style.padding = "20px";
sidebar.style.boxSizing = "border-box";
document.body.appendChild(sidebar);

let sidebarTimeout;
sidebarTrigger.addEventListener("mouseenter", () => {
    clearTimeout(sidebarTimeout);
    sidebar.style.left = "0";
});
sidebar.addEventListener("mouseenter", () => {
    clearTimeout(sidebarTimeout);
});
sidebarTrigger.addEventListener("mouseleave", () => {
    sidebarTimeout = setTimeout(() => {
        sidebar.style.left = "-200px";
    }, 300);
});
sidebar.addEventListener("mouseleave", () => {
    sidebarTimeout = setTimeout(() => {
        sidebar.style.left = "-200px";
    }, 300);
});

// Sidebar buttons BABEYYYYY
// Logbook
const logbookBtn = document.getElementById('sidebar-logbook');
if (logbookBtn) {
    logbookBtn.onclick = () => {
        itemListContainerMain.style.display = "none";
        ticketInboxContainer.style.display = "none";
        logbookContainer.style.display = "block";
        sidebar.style.left = "-200px";
    };
}

// Ticket Inbox
const ticketBtn = document.getElementById('sidebar-ticket');
if (ticketBtn) {
    ticketBtn.onclick = () => {
        itemListContainerMain.style.display = "none";
        ticketInboxContainer.style.display = "block";
        sidebar.style.left = "-200px";
    };
}

// Item catalogue
const catalogueBtn = document.getElementById('sidebar-catalogue');
if (catalogueBtn) {
    catalogueBtn.onclick = () => {
        ticketInboxContainer.style.display = "none";
        logbookContainer.style.display = "none";
        itemListContainerMain.style.display = "block";
        sidebar.style.left = "-200px";
    };
}
