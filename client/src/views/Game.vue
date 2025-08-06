<template>
  <div class="game-container">
    <h1>Sudoku</h1>
    <div class="board">
      <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
        <div
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          class="cell"
          :class="{ 'given': isGiven(rowIndex, colIndex), 'selected': rowIndex === selectedRow && colIndex === selectedCol }"
          @click="selectCell(rowIndex, colIndex)"
        >
          {{ cell === 0 ? '' : cell }}
        </div>
      </div>
    </div>
<div class="controls">
      <button @click="checkSolution" class="btn">Check</button>
      <button @click="saveGame" class="btn">Save</button>
      <router-link to="/dashboard" class="btn">Dashboard</router-link>
    </div>
    <div class="number-pad">
      <button v-for="n in 9" :key="n" @click="inputNumber(n)">{{ n }}</button>
      <button @click="inputNumber(0)">Clear</button>
    </div>
  </div>
</template>

<script>
import { generateSudoku } from '../sudoku-generator';

export default {
  name: 'SudokuGame',
  props: ['game'],
  data() {
    return {
      board: [],
      solution: [],
      given: [],
      selectedRow: -1,
      selectedCol: -1,
    };
  },
  methods: {
    selectCell(row, col) {
      if (!this.isGiven(row, col)) {
        this.selectedRow = row;
        this.selectedCol = col;
      }
    },
    isGiven(row, col) {
      return this.given.some(c => c[0] === row && c[1] === col);
    },
    checkSolution() {
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (this.board[r][c] !== this.solution[r][c]) {
            alert('Incorrect solution!');
            return;
          }
        }
      }
      alert('Congratulations! You solved the puzzle!');
    },
    async saveGame() {
      try {
        await this.$http.post('/games/save', {
          board: this.board,
          solution: this.solution,
          difficulty: 'medium', // TODO: Implement difficulty selection
        });
        alert('Game saved!');
      } catch (err) {
        console.error(err);
      }
    },
    generateBoard() {
      const { board, solution } = generateSudoku();
      this.board = board;
      this.solution = solution;
      this.given = [];
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (this.board[r][c] !== 0) {
            this.given.push([r, c]);
          }
        }
      }
    },
    inputNumber(num) {
      if (this.selectedRow !== -1) {
        const newBoard = JSON.parse(JSON.stringify(this.board));
        newBoard[this.selectedRow][this.selectedCol] = num;
        this.board = newBoard;
        this.selectedRow = -1;
        this.selectedCol = -1;
      }
    },
  },
  created() {
    if (this.game) {
      this.board = this.game.board;
      this.solution = this.game.solution;
      this.given = [];
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (this.board[r][c] !== 0) {
            this.given.push([r, c]);
          }
        }
      }
    } else {
      this.generateBoard();
    }
  },
};
</script>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.board {
  display: grid;
  grid-template-rows: repeat(9, 1fr);
  border: 2px solid black;
}
.row {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
}
.cell {
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.cell.given {
  background-color: #eee;
  font-weight: bold;
}
.controls {
  margin-top: 20px;
}
.number-pad {
  margin-top: 20px;
}
.number-pad button {
  width: 40px;
  height: 40px;
  margin: 5px;
  font-size: 20px;
}
.cell.selected {
  background-color: #aadeff;
}
.btn {
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #4285f4;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
</style>
