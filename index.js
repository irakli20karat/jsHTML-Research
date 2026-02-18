// #1. Browser Environment & DOM Basics

/* 
   The browser provides:
   - window: global object
   - document: entry point to the DOM (Document Object Model)
   - navigator, location, history, etc.
   
   DOM = tree structure of HTML elements
*/

console.log("--- 1. Browser Environment ---");
console.log("window.innerWidth:", window.innerWidth);
console.log("window.innerHeight:", window.innerHeight);
console.log("document.URL:", document.URL);
console.log("document.title:", document.title);


// #2. DOM Nodes

/*
   Everything in HTML is a NODE:
   - Element nodes (tags)
   - Text nodes (text content)
   - Comment nodes
   
   nodeType numbers:
   1 = Element
   3 = Text
   8 = Comment
   9 = Document
*/

console.log("--- 2. DOM Nodes ---");
let mainTitle = document.getElementById("main-title");
console.log("nodeType:", mainTitle.nodeType); // 1 (Element)
console.log("nodeName:", mainTitle.nodeName); // H1
console.log("tagName:", mainTitle.tagName); // H1

// Text node
let firstChild = mainTitle.firstChild;
console.log("Text nodeType:", firstChild.nodeType); // 3
console.log("Text nodeName:", firstChild.nodeName); // #text


// #3. DOM Navigation

/*
   Navigate between nodes using:
   - parentNode, childNodes, firstChild, lastChild
   - nextSibling, previousSibling
   
   Or navigate between ELEMENTS only:
   - parentElement, children, firstElementChild, lastElementChild
   - nextElementSibling, previousElementSibling
*/

console.log("--- 3. DOM Navigation ---");
let navSection = document.getElementById("nav-section");

// Children
console.log("childNodes (all):", navSection.childNodes); // includes text nodes
console.log("children (elements only):", navSection.children);

// First/Last
console.log("firstChild:", navSection.firstChild); // text node (whitespace)
console.log("firstElementChild:", navSection.firstElementChild); // <h2>

let mainList = document.getElementById("main-list");
console.log("Parent:", mainList.parentElement); // div.section

// Siblings
let firstLi = mainList.firstElementChild;
console.log("First li:", firstLi.textContent);
console.log("Next sibling:", firstLi.nextElementSibling.textContent); // Item 2


// #4. Searching Elements in DOM

/*
   Main methods:
   - getElementById(id)          => single element or null
   - getElementsByClassName(cls) => live HTMLCollection
   - getElementsByTagName(tag)   => live HTMLCollection
   - querySelector(selector)     => first match or null
   - querySelectorAll(selector)  => static NodeList
*/

console.log("--- 4.1 getElementById ---");
let inputField = document.getElementById("input-field");
console.log("Found input:", inputField);


console.log("--- 4.2 getElementsByClassName ---");
let textParas = document.getElementsByClassName("text");
console.log("Count:", textParas.length); // 3
console.log("First:", textParas[0].textContent);
// LIVE collection - updates automatically


console.log("--- 4.3 getElementsByTagName ---");
let allDivs = document.getElementsByTagName("div");
console.log("Total divs:", allDivs.length);


console.log("--- 4.4 querySelector ---");
// Returns FIRST match
let firstText = document.querySelector(".text");
console.log("First .text:", firstText.textContent);

// CSS selectors work
let highlighted = document.querySelector(".text.highlight");
console.log("Highlighted:", highlighted.textContent);


console.log("--- 4.5 querySelectorAll ---");
// Returns ALL matches as NodeList (NOT live)
let allTexts = document.querySelectorAll(".text");
console.log("Count:", allTexts.length);

// Can iterate
allTexts.forEach((el, index) => {
    console.log(`${index}: ${el.textContent}`);
});

// Complex selectors
let sectionHeadings = document.querySelectorAll(".section h2");
console.log("Section headings:", sectionHeadings.length);


// #5. NodeList vs HTMLCollection

/*
   NodeList:
   - Returned by querySelectorAll
   - STATIC (doesn't update)
   - Has forEach method
   
   HTMLCollection:
   - Returned by getElementsBy*
   - LIVE (auto-updates)
   - No forEach (but iterable)
*/

console.log("--- 5. NodeList vs HTMLCollection ---");

let nodeList = document.querySelectorAll(".text");
let htmlCollection = document.getElementsByClassName("text");

console.log("NodeList length:", nodeList.length); // 3
console.log("HTMLCollection length:", htmlCollection.length); // 3

// Add new element
let newP = document.createElement("p");
newP.className = "text";
newP.textContent = "New paragraph";
document.querySelector(".section").appendChild(newP);

console.log("After adding:");
console.log("NodeList (static):", nodeList.length); // still 3
console.log("HTMLCollection (live):", htmlCollection.length); // now 4


// #6. Basic DOM Node Properties

/*
   Common properties:
   - innerHTML: HTML content as string
   - textContent: text only (no tags)
   - nodeValue: for text nodes
   - data: for text/comment nodes
*/

console.log("--- 6. Node Properties ---");
let contentBox = document.getElementById("content-box");

console.log("innerHTML:", contentBox.innerHTML);
console.log("textContent:", contentBox.textContent);

// innerHTML vs textContent
contentBox.innerHTML = "<strong>Bold text</strong>";
console.log("After innerHTML:", contentBox.textContent); // "Bold text"

contentBox.textContent = "<strong>Not bold</strong>";
console.log("After textContent:", contentBox.innerHTML); // escaped HTML


// #7. Attributes and Properties

/*
   Attributes = in HTML
   Properties = in DOM object
   
   Usually synced, but not always!
*/

console.log("--- 7.1 getAttribute/setAttribute ---");
let input = document.getElementById("input-field");

// Get
console.log("type attr:", input.getAttribute("type")); // "text"
console.log("data-custom:", input.getAttribute("data-custom")); // "test-data"

// Set
input.setAttribute("placeholder", "Enter text...");
console.log("placeholder set");

// Has
console.log("has type?", input.hasAttribute("type")); // true
console.log("has readonly?", input.hasAttribute("readonly")); // false

// Remove
input.removeAttribute("data-custom");
console.log("data-custom removed:", input.hasAttribute("data-custom")); // false


console.log("--- 7.2 Properties vs Attributes ---");
let btn = document.getElementById("test-btn");

// Property
console.log("disabled property:", btn.disabled); // true
btn.disabled = false;
console.log("disabled after prop change:", btn.disabled); // false

// Attribute reflects it
console.log("has disabled attr?", btn.hasAttribute("disabled")); // false

// INPUT special case: value property vs attribute
input.value = "New value";
console.log("value property:", input.value); // "New value"
console.log("value attribute:", input.getAttribute("value")); // "Initial value"
// They can differ!


console.log("--- 7.3 Standard vs Custom Attributes ---");
// Standard attributes become properties
console.log("input.type:", input.type); // "text"

// Non-standard don't (use dataset for data-*)
console.log("input.dataset:", input.dataset); // DOMStringMap


// #8. innerHTML vs textContent

/*
   innerHTML:
   - Parses HTML tags
   - Can be dangerous (XSS)
   - Slower
   
   textContent:
   - Text only
   - Safe
   - Faster
*/

console.log("--- 8. innerHTML vs textContent ---");
let box = document.getElementById("content-box");

// innerHTML creates elements
box.innerHTML = "<em>Italic</em> and <strong>bold</strong>";
console.log("innerHTML result:", box.children.length); // 2 elements

// textContent escapes everything
box.textContent = "<em>Not italic</em>";
console.log("textContent result:", box.children.length); // 0 elements
console.log("Text:", box.textContent);


// #9. Style Property

/*
   element.style accesses INLINE styles only
   - CSS properties become camelCase
   - Returns CSSStyleDeclaration object
*/

console.log("--- 9. Style Property ---");
let styleBox = document.getElementById("style-box");

// Set styles
styleBox.style.backgroundColor = "lightblue";
styleBox.style.padding = "20px";
styleBox.style.fontSize = "18px";
styleBox.style.border = "2px solid blue";

console.log("backgroundColor:", styleBox.style.backgroundColor);
console.log("padding:", styleBox.style.padding);

// Multi-word properties
styleBox.style.borderRadius = "5px";

// cssText - set multiple at once
styleBox.style.cssText = "background: coral; padding: 25px; color: white;";

// Read computed styles (includes CSS file styles)
let computed = window.getComputedStyle(styleBox);
console.log("Computed padding:", computed.padding);
console.log("Computed border:", computed.border);


// #10. classList

/*
   classList is a DOMTokenList object
   Methods:
   - add(class1, class2, ...)    => add classes
   - remove(class1, class2, ...) => remove classes
   - toggle(class, force?)       => toggle or force on/off
   - contains(class)             => check if has class
   - replace(old, new)           => replace class
   - item(index)                 => get class at index
   - length                      => number of classes
*/

console.log("--- 10.1 classList.add ---");
// Add single class
box.classList.add("highlight");
console.log("Classes:", box.className);

// Add multiple classes
box.classList.add("active", "visible", "ready");
console.log("After multiple add:", box.className);


console.log("--- 10.2 classList.remove ---");
// Remove single
box.classList.remove("active");
console.log("After remove:", box.className);

// Remove multiple
box.classList.remove("visible", "ready");
console.log("After multiple remove:", box.className);

// Remove non-existent (no error)
box.classList.remove("non-existent");
console.log("After removing non-existent:", box.className);


console.log("--- 10.3 classList.toggle ---");
// Basic toggle (add if absent, remove if present)
btn.classList.toggle("active");
console.log("After first toggle:", btn.classList.contains("active")); // true

btn.classList.toggle("active");
console.log("After second toggle:", btn.classList.contains("active")); // false

// Force parameter (true = add, false = remove)
btn.classList.toggle("enabled", true); // always add
console.log("Forced add:", btn.classList.contains("enabled")); // true

btn.classList.toggle("enabled", false); // always remove
console.log("Forced remove:", btn.classList.contains("enabled")); // false

// Returns boolean (true if added, false if removed)
let wasAdded = btn.classList.toggle("active");
console.log("Toggle returned:", wasAdded); // true


console.log("--- 10.4 classList.contains ---");
box.classList.add("test-class");

console.log("Has 'test-class'?", box.classList.contains("test-class")); // true
console.log("Has 'missing'?", box.classList.contains("missing")); // false

// Use in conditions
if (box.classList.contains("highlight")) {
    console.log("Box is highlighted!");
}


console.log("--- 10.5 classList.replace ---");
box.className = "old-class another-class";
console.log("Before replace:", box.className);

// Replace old with new
let replaced = box.classList.replace("old-class", "new-class");
console.log("Replace successful?", replaced); // true
console.log("After replace:", box.className);

// Replace non-existent returns false
let notReplaced = box.classList.replace("missing", "new");
console.log("Replace non-existent:", notReplaced); // false


console.log("--- 10.6 classList other methods ---");
box.className = "first second third";

// item(index) - get class at position
console.log("Class at index 0:", box.classList.item(0)); // "first"
console.log("Class at index 1:", box.classList.item(1)); // "second"

// length
console.log("Number of classes:", box.classList.length); // 3

// Iterate
for (let i = 0; i < box.classList.length; i++) {
    console.log(`Class ${i}:`, box.classList.item(i));
}

// forEach (available on DOMTokenList)
box.classList.forEach((cls, index) => {
    console.log(`${index}: ${cls}`);
});


console.log("--- 10.7 classList vs className ---");
let testDiv = document.querySelector(".section");

// className = string (overwrites)
console.log("className:", testDiv.className);
testDiv.className = "new-class"; // replaces all
console.log("After className set:", testDiv.className);

// classList = object (precise control)
testDiv.classList.add("section"); // restore
testDiv.classList.add("extra");
console.log("After classList:", testDiv.className);

// className can be read/written
testDiv.className += " another"; // string concat
console.log("After concat:", testDiv.className);


console.log("--- 10.8 Practical classList Examples ---");

// Example 1: Theme switcher
function setTheme(element, theme) {
    element.classList.remove("theme-light", "theme-dark");
    element.classList.add(`theme-${theme}`);
}

setTheme(styleBox, "dark");
console.log("Theme classes:", styleBox.className);


// Example 2: Multi-state toggle
function cycleState(element, states) {
    for (let state of states) {
        if (element.classList.contains(state)) {
            element.classList.remove(state);
            let nextIndex = (states.indexOf(state) + 1) % states.length;
            element.classList.add(states[nextIndex]);
            return states[nextIndex];
        }
    }
    // No state found, add first
    element.classList.add(states[0]);
    return states[0];
}

let testEl = document.createElement("div");
console.log("State 1:", cycleState(testEl, ["loading", "success", "error"])); // loading
console.log("State 2:", cycleState(testEl, ["loading", "success", "error"])); // success
console.log("State 3:", cycleState(testEl, ["loading", "success", "error"])); // error
console.log("State 4:", cycleState(testEl, ["loading", "success", "error"])); // loading


// Example 3: Conditional classes
function updateClasses(element, conditions) {
    for (let [className, shouldAdd] of Object.entries(conditions)) {
        element.classList.toggle(className, shouldAdd);
    }
}

updateClasses(input, {
    "valid": true,
    "invalid": false,
    "touched": true
});
console.log("Conditional classes:", input.className);


// Example 4: Has any/all classes
function hasAnyClass(element, classes) {
    return classes.some(cls => element.classList.contains(cls));
}

function hasAllClasses(element, classes) {
    return classes.every(cls => element.classList.contains(cls));
}

box.className = "active highlight ready";
console.log("Has any [active, missing]?", hasAnyClass(box, ["active", "missing"])); // true
console.log("Has all [active, highlight]?", hasAllClasses(box, ["active", "highlight"])); // true
console.log("Has all [active, missing]?", hasAllClasses(box, ["active", "missing"])); // false


// #11. Practical Examples

console.log("--- 11. Practical Examples ---");

// Example 1: Toggle class
function toggleHighlight(element) {
    element.classList.toggle("highlight");
}

let firstPara = document.querySelector(".text");
toggleHighlight(firstPara);
console.log("Toggled highlight on first para");


// Example 2: Get all data attributes
function getDataAttributes(element) {
    let data = {};
    for (let key in element.dataset) {
        data[key] = element.dataset[key];
    }
    return data;
}

input.setAttribute("data-user-id", "123");
input.setAttribute("data-role", "admin");
console.log("Data attributes:", getDataAttributes(input));


// Example 3: Find parent with specific class
function findParentWithClass(element, className) {
    let current = element.parentElement;
    while (current) {
        if (current.classList.contains(className)) {
            return current;
        }
        current = current.parentElement;
    }
    return null;
}

let section = findParentWithClass(input, "section");
console.log("Found parent section:", section !== null);


// Example 4: Get all siblings
function getSiblings(element) {
    let siblings = [];
    let sibling = element.parentElement.firstElementChild;

    while (sibling) {
        if (sibling !== element) {
            siblings.push(sibling);
        }
        sibling = sibling.nextElementSibling;
    }

    return siblings;
}

let listItem = mainList.children[1];
console.log("Siblings count:", getSiblings(listItem).length); // 2


// #12. Event Listeners

/*
   addEventListener(event, handler, options)
   
   Event types:
   - Mouse: click, dblclick, mousedown, mouseup, mousemove, mouseenter, mouseleave
   - Keyboard: keydown, keyup, keypress
   - Form: submit, change, input, focus, blur
   - Document: DOMContentLoaded, load
   - Window: resize, scroll
   
   Event object properties:
   - type: event name
   - target: element that triggered event
   - currentTarget: element listener is attached to
   - preventDefault(): prevent default action
   - stopPropagation(): stop bubbling
*/

console.log("--- 12.1 addEventListener Basics ---");

let clickBtn = document.getElementById("click-btn");
let clickCount = 0;

// Basic click handler
function handleClick(event) {
    clickCount++;
    console.log("Button clicked!", clickCount, "times");
    console.log("Event type:", event.type);
    console.log("Target:", event.target);
}

clickBtn.addEventListener("click", handleClick);
console.log("Click listener added to button");


console.log("--- 12.2 Event Object Properties ---");

let eventTestBtn = document.getElementById("event-test-btn");

eventTestBtn.addEventListener("click", (event) => {
    console.log("--- Event Object ---");
    console.log("type:", event.type); // "click"
    console.log("target:", event.target); // button element
    console.log("currentTarget:", event.currentTarget); // same as target here
    console.log("clientX:", event.clientX); // mouse X position
    console.log("clientY:", event.clientY); // mouse Y position
    console.log("timeStamp:", event.timeStamp); // when event occurred
    console.log("isTrusted:", event.isTrusted); // true if real user action
});


console.log("--- 12.3 Multiple Listeners on Same Element ---");

let multiBtn = document.getElementById("multi-btn");

// Can add multiple listeners for same event
multiBtn.addEventListener("click", () => {
    console.log("First listener");
});

multiBtn.addEventListener("click", () => {
    console.log("Second listener");
});

multiBtn.addEventListener("click", () => {
    console.log("Third listener");
});

// All three will execute in order
console.log("Added 3 listeners to multi-btn");


console.log("--- 12.4 removeEventListener ---");

let removeBtn = document.getElementById("remove-btn");
let removeCount = 0;

// Named function (required for removal)
function countClicks() {
    removeCount++;
    console.log("Clicks:", removeCount);

    // Remove after 3 clicks
    if (removeCount >= 3) {
        removeBtn.removeEventListener("click", countClicks);
        console.log("Listener removed!");
    }
}

removeBtn.addEventListener("click", countClicks);
console.log("Click remove-btn 3 times, then it stops");


console.log("--- 12.5 Event Types ---");

// Mouse events
let mouseBox = document.getElementById("mouse-box");

mouseBox.addEventListener("mouseenter", () => {
    mouseBox.style.backgroundColor = "lightblue";
    console.log("Mouse entered");
});

mouseBox.addEventListener("mouseleave", () => {
    mouseBox.style.backgroundColor = "lightgray";
    console.log("Mouse left");
});

mouseBox.addEventListener("mousemove", (e) => {
    // Too many logs, show rect position
    let rect = mouseBox.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    mouseBox.textContent = `Mouse: (${Math.floor(x)}, ${Math.floor(y)})`;
});


// Keyboard events
let keyInput = document.getElementById("key-input");

keyInput.addEventListener("keydown", (e) => {
    console.log("Key down:", e.key, "Code:", e.code);
});

keyInput.addEventListener("keyup", (e) => {
    console.log("Key up:", e.key);
});


// Input events
let textInput = document.getElementById("text-input");
let charCount = document.getElementById("char-count");

textInput.addEventListener("input", (e) => {
    charCount.textContent = e.target.value.length;
    console.log("Input changed:", e.target.value);
});


// Change event (fires on blur for text, immediately for select/checkbox)
textInput.addEventListener("change", (e) => {
    console.log("Input changed (blur):", e.target.value);
});


// Focus/blur
textInput.addEventListener("focus", () => {
    textInput.style.backgroundColor = "lightyellow";
    console.log("Input focused");
});

textInput.addEventListener("blur", () => {
    textInput.style.backgroundColor = "white";
    console.log("Input blurred");
});


console.log("--- 12.6 preventDefault ---");

let preventForm = document.getElementById("prevent-form");
let preventLink = document.getElementById("prevent-link");

// Prevent form submission
preventForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Don't reload page
    console.log("Form submit prevented");

    let formData = new FormData(preventForm);
    console.log("Form data:", Object.fromEntries(formData));
});

// Prevent link navigation
preventLink.addEventListener("click", (e) => {
    e.preventDefault(); // Don't navigate
    console.log("Link click prevented");
    console.log("Would have gone to:", e.target.href);
});


console.log("--- 12.7 Event Delegation ---");

/*
   Attach listener to parent instead of many children
   Use event.target to identify which child was clicked
   
   Benefits:
   - Single listener instead of many
   - Works for dynamically added elements
   - Better performance
*/

let delegateList = document.getElementById("delegate-list");
let addItemBtn = document.getElementById("add-item-btn");

// Single listener on parent
delegateList.addEventListener("click", (e) => {
    // Check if clicked element is an LI
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("completed");
        console.log("Toggled:", e.target.textContent);
    }
});

// Add items dynamically
let itemCount = 4;
addItemBtn.addEventListener("click", () => {
    let newItem = document.createElement("li");
    newItem.textContent = `Item ${itemCount++}`;
    delegateList.appendChild(newItem);
    console.log("Added item (delegation still works!)");
});


console.log("--- 12.8 Event Listener Options ---");

/*
   addEventListener(event, handler, options)
   
   Options object:
   - capture: boolean (use capture phase)
   - once: boolean (remove after first trigger)
   - passive: boolean (won't call preventDefault)
   - signal: AbortSignal (for removal)
*/

let optionsBtn = document.getElementById("options-btn");

// Once: auto-remove after first trigger
optionsBtn.addEventListener("click", () => {
    console.log("This will only fire once!");
}, { once: true });

// Can add another that fires every time
optionsBtn.addEventListener("click", () => {
    console.log("This fires every time");
});


// Using AbortController for removal
let abortController = new AbortController();

let abortBtn = document.getElementById("abort-btn");
let abortToggle = document.getElementById("abort-toggle");

abortBtn.addEventListener("click", () => {
    console.log("Abort button clicked!");
}, { signal: abortController.signal });

abortToggle.addEventListener("click", () => {
    abortController.abort();
    console.log("Listener aborted!");
    abortToggle.disabled = true;
});


console.log("--- 12.9 Common Event Patterns ---");

// Pattern 1: Debouncing (wait for typing to stop)
let searchInput = document.getElementById("search-input");
let searchTimeout;

searchInput.addEventListener("input", (e) => {
    clearTimeout(searchTimeout); // Cancel previous timer

    searchTimeout = setTimeout(() => {
        console.log("Searching for:", e.target.value);
    }, 500); // Wait 500ms after typing stops
});


// Pattern 2: Throttling (limit execution rate)
let scrollArea = document.getElementById("scroll-area");
let lastScroll = 0;
let scrollThrottle = 100; // ms

scrollArea.addEventListener("scroll", (e) => {
    let now = Date.now();

    if (now - lastScroll >= scrollThrottle) {
        console.log("Scroll position:", e.target.scrollTop);
        lastScroll = now;
    }
});


// Pattern 3: Click outside to close
let dropdown = document.getElementById("dropdown");
let dropdownBtn = document.getElementById("dropdown-btn");

dropdownBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Don't trigger document click
    dropdown.classList.toggle("show");
});

document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("show");
        console.log("Clicked outside, closing dropdown");
    }
});


// Pattern 4: Keyboard shortcuts
document.addEventListener("keydown", (e) => {
    // Ctrl+S (or Cmd+S on Mac)
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        console.log("Save shortcut triggered!");
    }

    // Escape key
    if (e.key === "Escape") {
        console.log("Escape pressed!");
        dropdown.classList.remove("show");
    }
});


// #13. setTimeout and setInterval

/*
   setTimeout(callback, delay, ...args)
   - Executes callback once after delay (ms)
   - Returns timeout ID
   - Use clearTimeout(id) to cancel
   
   setInterval(callback, delay, ...args)
   - Executes callback repeatedly every delay (ms)
   - Returns interval ID
   - Use clearInterval(id) to stop
*/

console.log("--- 13.1 setTimeout Basics ---");

// Basic setTimeout
setTimeout(() => {
    console.log("This runs after 1 second");
}, 1000);

// With arguments
setTimeout((name, age) => {
    console.log(`Hello ${name}, you are ${age}`);
}, 1500, "Alice", 25);

// Named function
function greet() {
    console.log("Greetings!");
}

setTimeout(greet, 2000);


console.log("--- 13.2 clearTimeout ---");

let delayedLog = setTimeout(() => {
    console.log("This will never run!");
}, 5000);

// Cancel before it executes
clearTimeout(delayedLog);
console.log("Timeout canceled");


// Practical: Delayed action with cancel option
let cancelBtn = document.getElementById("cancel-btn");
let delayedActionBtn = document.getElementById("delayed-action-btn");
let countdownDisplay = document.getElementById("countdown");

let actionTimeout;
let countdownInterval;

delayedActionBtn.addEventListener("click", () => {
    let secondsLeft = 3;
    countdownDisplay.textContent = secondsLeft;

    // Update countdown every second
    countdownInterval = setInterval(() => {
        secondsLeft--;
        countdownDisplay.textContent = secondsLeft;

        if (secondsLeft <= 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);

    // Main action after 3 seconds
    actionTimeout = setTimeout(() => {
        console.log("Action executed!");
        countdownDisplay.textContent = "Done!";
    }, 3000);
});

cancelBtn.addEventListener("click", () => {
    clearTimeout(actionTimeout);
    clearInterval(countdownInterval);
    countdownDisplay.textContent = "Canceled";
    console.log("Action canceled");
});


console.log("--- 13.3 setInterval Basics ---");

// Basic interval
let counter = 0;
let basicInterval = setInterval(() => {
    counter++;
    console.log("Interval tick:", counter);

    // Stop after 5 ticks
    if (counter >= 5) {
        clearInterval(basicInterval);
        console.log("Interval stopped");
    }
}, 1000);


console.log("--- 13.4 Interval Patterns ---");

// Pattern 1: Clock
let clockDisplay = document.getElementById("clock");

function updateClock() {
    let now = new Date();
    let time = now.toLocaleTimeString();
    clockDisplay.textContent = time;
}

updateClock(); // Show immediately
let clockInterval = setInterval(updateClock, 1000);


// Pattern 2: Progress bar
let progressBar = document.getElementById("progress-bar");
let startProgressBtn = document.getElementById("start-progress");

startProgressBtn.addEventListener("click", () => {
    let progress = 0;
    progressBar.style.width = "0%";

    let progressInterval = setInterval(() => {
        progress += 2;
        progressBar.style.width = progress + "%";

        if (progress >= 100) {
            clearInterval(progressInterval);
            console.log("Progress complete!");
        }
    }, 50); // Update every 50ms
});


// Pattern 3: Polling (check for updates)
let pollCount = 0;

function checkForUpdates() {
    pollCount++;
    console.log("Checking for updates...", pollCount);

    // Simulate update found
    if (pollCount === 3) {
        console.log("Update found!");
        clearInterval(pollInterval);
    }
}

let pollInterval = setInterval(checkForUpdates, 2000);


console.log("--- 13.5 setTimeout vs setInterval ---");

/*
   setTimeout:
   - One-time execution
   - Next execution scheduled after previous completes
   - More control, safer
   
   setInterval:
   - Repeated execution
   - Executes regardless of previous completion
   - Can stack up if callback is slow
*/

// Safer alternative to setInterval: recursive setTimeout
let recursiveCount = 0;

function recursiveTimer() {
    recursiveCount++;
    console.log("Recursive tick:", recursiveCount);

    if (recursiveCount < 5) {
        // Schedule next execution AFTER this one completes
        setTimeout(recursiveTimer, 1000);
    } else {
        console.log("Recursive timer done");
    }
}

// Start recursive timer
setTimeout(recursiveTimer, 1000);


console.log("--- 13.6 Common Dangers ---");

// Danger 1: setTimeout(func(), delay) - WRONG!
// This executes func immediately, passes result to setTimeout

function sayHello() {
    console.log("Hello!");
}

// WRONG: executes immediately
// setTimeout(sayHello(), 1000);

// CORRECT: pass function reference
setTimeout(sayHello, 1000);


// Danger 2: Arrow functions and this
let objWithTimer = {
    name: "MyObject",

    // Arrow function preserves 'this'
    startArrow() {
        setTimeout(() => {
            console.log("Arrow this.name:", this.name); // "MyObject"
        }, 100);
    },

    // Regular function loses 'this'
    startRegular() {
        setTimeout(function () {
            console.log("Regular this.name:", this.name); // undefined
        }, 100);
    },

    // Regular function with bind
    startBind() {
        setTimeout(function () {
            console.log("Bind this.name:", this.name); // "MyObject"
        }.bind(this), 100);
    }
};

objWithTimer.startArrow();
objWithTimer.startRegular();
objWithTimer.startBind();


// Danger 3: Interval drift
// setInterval doesn't account for execution time

let driftStart = Date.now();
let driftInterval = setInterval(() => {
    let elapsed = Date.now() - driftStart;
    console.log("Expected: 1000ms, Actual:", elapsed);
    driftStart = Date.now();
}, 1000);

// Stop after 3 seconds
setTimeout(() => {
    clearInterval(driftInterval);
}, 3000);


// Danger 4: Memory leaks - forgetting to clear intervals
// ALWAYS clear intervals when done!

function createLeakyInterval() {
    // BAD: interval keeps running even after element removed
    setInterval(() => {
        console.log("Still running...");
    }, 1000);
    // This will run forever unless page reloads!
}

// GOOD: save reference and clear it
let savedInterval;

function createProperInterval() {
    savedInterval = setInterval(() => {
        console.log("Running properly");
    }, 1000);
}

function cleanup() {
    clearInterval(savedInterval);
    console.log("Cleaned up!");
}


console.log("--- 13.7 Animation with setTimeout/Interval ---");

// Animate element position
let animBox = document.getElementById("anim-box");
let animateBtn = document.getElementById("animate-btn");

animateBtn.addEventListener("click", () => {
    let pos = 0;
    let id = setInterval(() => {
        if (pos >= 200) {
            clearInterval(id);
        } else {
            pos += 2;
            animBox.style.left = pos + "px";
        }
    }, 10);
});


// Fade in animation
let fadeBox = document.getElementById("fade-box");
let fadeBtn = document.getElementById("fade-btn");

fadeBtn.addEventListener("click", () => {
    let opacity = 0;
    fadeBox.style.opacity = 0;

    let fadeInterval = setInterval(() => {
        if (opacity >= 1) {
            clearInterval(fadeInterval);
        } else {
            opacity += 0.1;
            fadeBox.style.opacity = opacity;
        }
    }, 50);
});


console.log("--- 13.8 Practical Timer Examples ---");

// Example 1: Auto-save
let autoSaveInput = document.getElementById("autosave-input");
let saveStatus = document.getElementById("save-status");
let autoSaveTimer;

autoSaveInput.addEventListener("input", () => {
    saveStatus.textContent = "Unsaved changes...";

    // Clear existing timer
    clearTimeout(autoSaveTimer);

    // Set new timer
    autoSaveTimer = setTimeout(() => {
        // Simulate save
        saveStatus.textContent = "Saved!";
        console.log("Auto-saved:", autoSaveInput.value);

        // Clear status after 2 seconds
        setTimeout(() => {
            saveStatus.textContent = "";
        }, 2000);
    }, 1000);
});


// Example 2: Notification timeout
function showNotification(message, duration = 3000) {
    let notification = document.getElementById("notification");
    notification.textContent = message;
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, duration);
}

document.getElementById("notify-btn").addEventListener("click", () => {
    showNotification("This is a notification!");
});


// Example 3: Rate limiting
let rateLimitBtn = document.getElementById("rate-limit-btn");
let lastClick = 0;
let cooldown = 2000; // 2000ms = 2s

rateLimitBtn.addEventListener("click", () => {
    let now = Date.now();

    if (now - lastClick < cooldown) {
        let remaining = Math.ceil((cooldown - (now - lastClick)) / 1000);
        console.log(`Wait ${remaining} more seconds`);
        return;
    }

    lastClick = now;
    console.log("Action executed!");

    // Visual cooldown
    rateLimitBtn.disabled = true;
    setTimeout(() => {
        rateLimitBtn.disabled = false;
    }, cooldown);
});


// Example 4: Countdown timer
let countdownBtn = document.getElementById("countdown-btn");
let countdownText = document.getElementById("countdown-text");

countdownBtn.addEventListener("click", () => {
    let seconds = 10;
    countdownText.textContent = seconds;
    countdownBtn.disabled = true;

    let countdownTimer = setInterval(() => {
        seconds--;
        countdownText.textContent = seconds;

        if (seconds <= 0) {
            clearInterval(countdownTimer);
            countdownText.textContent = "Done!";
            countdownBtn.disabled = false;
            console.log("Countdown finished!");
        }
    }, 1000);
});


// #12. Interactive classList Demo

console.log("--- 12. Interactive Demo ---");

// Setup interactive demo
let classDemo = document.getElementById("class-demo");
let toggleBtn = document.getElementById("toggle-btn");

let demoClasses = ["active", "highlight", "ready"];
let currentIndex = 0;

toggleBtn.addEventListener("click", () => {
    // Remove all demo classes
    classDemo.classList.remove(...demoClasses);

    // Add current class
    classDemo.classList.add(demoClasses[currentIndex]);

    // Update button text
    toggleBtn.textContent = `Current: ${demoClasses[currentIndex]} (click to cycle)`;

    // Move to next class
    currentIndex = (currentIndex + 1) % demoClasses.length;

    console.log("Demo classes:", classDemo.className);
});

toggleBtn.click();


// SUMMARY

/*
   DOM SEARCHING:
   querySelector/All    - Modern, flexible, static
   getElementById       - Fast, single element
   getElementsBy*       - Live collections
   
   DOM NAVIGATION:
   Use *Element* versions to skip text nodes
   
   CONTENT:
   textContent - safe, text only
   innerHTML   - parses HTML, use carefully
   
   ATTRIBUTES:
   Properties - for standard attributes
   getAttribute/setAttribute - for any attribute
   dataset - for data-* attributes
   
   CLASSES:
   classList.add/remove - add/remove classes
   classList.toggle - toggle or force
   classList.contains - check for class
   classList.replace - swap classes
   className - direct string access
   
   STYLES:
   element.style - inline only
   getComputedStyle - final computed styles
   
   EVENTS:
   addEventListener - attach listeners
   removeEventListener - remove listeners (needs same function reference)
   event object - type, target, preventDefault, stopPropagation
   Event capturing - events propagate down
   
   TIMERS:
   setTimeout - one-time delayed execution
   clearTimeout - cancel timeout
   setInterval - repeated execution
   clearInterval - stop interval
*/

console.log("--- Done! Check console for all examples ---");