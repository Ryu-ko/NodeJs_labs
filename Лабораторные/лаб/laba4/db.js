class DB {
  constructor() {
    this.data = [
      { id: 1, name: "Vlad", bday: "13-06-2003" },
      { id: 2, name: "Senja", bday: "14-03-2004" },
    ];
  }

  async select() {
    return this.data;
  }

  async insert(newData) {
    const id = this.data.length + 1;
    newData = { id: id, ...newData };
    this.data.push(newData);
    return newData;
  }

  async update(id, updatedData) {
    const index = this.data.findIndex((item) => item.id == id);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...updatedData };
      return this.data[index];
    }
    return null;
  }

  async remove(id) {
    const index = this.data.findIndex((item) => item.id == id);
    if (index !== -1) {
      const deletedData = this.data.splice(index, 1);
      return deletedData[0];
    }
    return null;
  }
}

module.exports = DB;
