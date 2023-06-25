if (!window.location.href.includes('/comments/')) {
  console.log("Not on comments page, stopping script");
  return;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function deleteComments() {
  console.log('deleteComments function started');

  const menuButtons = document.querySelectorAll("button[aria-label='more options']");
  console.log('Found', menuButtons.length, 'menu buttons');

  for (let button of menuButtons) {
    button.click();
    await sleep(1000);

    const deleteButtons = document.querySelectorAll("button[role='menuitem']");
    console.log('Found', deleteButtons.length, 'delete buttons');

    for (let deleteButton of deleteButtons) {
      if (deleteButton.textContent.includes("delete")) {
        deleteButton.click();
        break;
      }
    }

    await sleep(1000);

    const confirmDeleteButtons = document.querySelectorAll("button._17UyTSs2atqnKg9dIq5ERg");
    console.log('Found', confirmDeleteButtons.length, 'confirm delete buttons');

    for (let confirmDeleteButton of confirmDeleteButtons) {
      if (confirmDeleteButton.textContent.includes("Delete")) {
        confirmDeleteButton.click();
        break;
      }
    }

    await sleep(1000);
  }

  console.log('deleteComments function ended');
}

console.log('Starting deletion process');
deleteComments();
