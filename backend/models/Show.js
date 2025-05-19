class Show {
    constructor(id, endTime) {
      this.id = id;
      this.endTime = endTime;
      this.selections = new Map(); // userId -> number
    }
  
    addSelection(userId, number) {
      if (this.selections.has(userId)) {
        throw new Error('User has already selected a number');
      }
  
      if (Array.from(this.selections.values()).includes(number)) {
        throw new Error('Number has already been selected');
      }
  
      this.selections.set(userId, number);
    }
  
    getSelections() {
      return Array.from(this.selections.entries()).map(([userId, number]) => ({
        userId,
        number,
      }));
    }
  
    hasEnded() {
      return Date.now() >= this.endTime;
    }
  }
  
  // Export the class
  module.exports = Show;

  