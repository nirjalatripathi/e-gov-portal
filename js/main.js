// Runs JS Only after full HTML is loaded
document.addEventListener("DOMContentLoaded", function () {

// SEARCH NAVIGATION
const searchInput = document.getElementById("serviceSearch");
if (searchInput) {
    searchInput.addEventListener("keydown", function(e) {
        if (e.key==="Enter") {

        // Convert search text to lowercase for easy matching
        const value= searchInput.value.toLowerCase().trim();

        //Redirect user based on keyword typed
        if (value.includes("census")) {
            location.href="census.html";
        }

     else if (value.includes("vote")) {
        location.href="voting.html";
    }
     else if (value.includes("allowance")) {
        location.href="allowance.html";

    }
    else{
        alert("Service not found");
    }
}
    });
}

//CENSUS FORM LOGIC 
const censusForm= document.getElementById("censusForm");
if (censusForm) {
    censusForm.addEventListener("submit", function (e) {
        e.preventDefault(); //stop page reload

        //Get input values
        const name= document.getElementById("CensusName").value.trim();
        const address= document.getElementById("CensusAddress").value.trim();
        const family= document.getElementById("FamilyCount").value;

        // Basic validation
        if (!name|| !address|| !family) {
            alert ("PLease fill all census details.");
            return;
        }
        if (family <=0) {
            alert("Family members must be at least 1.");
            return;
        }
        alert("Census submitted successfully.");
        censusForm.requestFullscreen(); // Clear form 

    });
}

//ALLOWANCE FORM
const allowanceForm = document.getElementById("allowanceForm");
if (allowanceForm) {
    allowanceForm.addEventListener("submit", function (e) {
        e.preventDefault(); //Prevent Refresh
        //Get form values
        const name= document.getElementById("allowName").value.trim();
        const citizen= document.getElementById("allowCitizen").value.trim();
        const age= document.getElementById("allowAge").value.trim();
        const bankName= document.getElementById("bankName").value.trim();
        const bankAcc= document.getElementById("bankAccount").value.trim();
         const mobile= document.getElementById("mobile").value.trim();
         const messageBox= document.getElementById("allowMsg").value.trim();
// Check empty fields
if (!name || !citizen || !age || !bankName || !bankAcc || !mobile) {
    messageBox.className= "text-red-600 text-center mb-4";
    messageBox.textContent="Please fill all required fields.";
    messageBox.classList.remove("hidden");
    return;
}
//Age eligibility check 
if (age < 60) {
    messageBox.className= "text-red-600 text-center mb-4";
    messageBox.textContent="You are not eligible for old age allowance.";
    messageBox.classList.remove("hidden");
    return;
}
//Mobile number length check 
if (mobile.lenght !==10) {
    messageBox.className="text-red-600 text-center mb-4";
    messageBox.textContent="Mobile number must be 10 digits";
    messageBox.classList.remove("hidden");
    return;
}
//Success Message
messageBox.className="text-green-600 text-center mb-4";
messageBox.textContent="Allowance application submitted successfully.";
messageBox.classList.remove("hidden");
allowanceForm.reset(); // clear form
    });

}
});

//ONLINE VOTING
function submitVote() {
    //Get voting form values
const citizenship= document.getElementById("citizenship").value.trim();
const name= document.getElementById("VoterName").value.trim();
const age= parseINt(document.getElementById("VoterAge").value);
const district= document.getElementById("district").value.trim();
const voterID= document.getElementById("VoterID").value.trim();
const party= document.getElementById("party").value;
const errorBox= document.getElementById("VoteError").value;
//Clear previous message color
errorBox.classList.remove("text-green-600");
errorBox.classList.add("text-red-600");

// Check if user already voted using LocalStorage
if (localStorage.getItem("hasVoted")) {
    errorBox.textContent="You have already voted. Multiple voting is not allowed";
    errorBox.classList.remove("hidden");
return;
}
//Required fields validation
if (!citizenship || !name || !age || !district || !voterID || !party) {
    errorBox.textContent= "Please fill all required voting details."
    errorBox.classList.remove("hidden");
    return;
}
//Age validation
if (age <18) {
    errorBox.textContent=" You must be at least 18 years old to vote";
    errorBox.classList.remove("hidden");
    return;  
}

//Sve voting status in browser storage
localStorage.setItem("hasVoted", true);

//Show success message
errorBox.classList.remove("text-red-600");
errorBox.classList.add("text-green-600");
errorBox.textContent="Vote submitted successfully. Thankyou for voting!";
errorBox.classList.remove("hidden");
}
