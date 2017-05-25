const list: HTMLUListElement = document.getElementById('list') as HTMLUListElement;
const input: HTMLInputElement = document.getElementById('input') as HTMLInputElement;

function addTask() {
    const li = document.createElement('li') as HTMLLIElement;
    const value = input.value;
    li.innerHTML = value;
    list.appendChild(li);
}