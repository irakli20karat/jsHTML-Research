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

console.log("--- 10. Practical Examples ---");

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


// #11. Interactive classList Demo

console.log("--- 11. Interactive Demo ---");

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

// Initialize
toggleBtn.click();


// So, here's the summary:

/*
   SEARCHING:
   querySelector/All    - Modern, flexible, static
   getElementById       - Fast, single element
   getElementsBy*       - Live collections
   
   NAVIGATION:
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
*/

console.log("--- Done! Check console for all examples ---");