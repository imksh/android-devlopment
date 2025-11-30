export function makeSnakeBoard() {
  const rows = [];

  for (let row = 0; row < 10; row++) {
    const start = 100 - row * 10;
    const end = start - 9;

    let currentRow = [];

    for (let num = start; num >= end; num--) {
      currentRow.push(num);
    }

    if (row % 2 === 1) {
      currentRow.reverse();
    }

    rows.push(...currentRow);
  }

  return rows;
}
