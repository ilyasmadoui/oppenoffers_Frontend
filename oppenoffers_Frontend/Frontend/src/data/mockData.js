// data/mockData.js
export const selectedFournisseur = {
  id: 1,
  name: "Fournisseur A",
  email: "a@gmail.com",
  phone: "0555 123 456",
  rc: "123456789",
  nif: "987654321",
  address: "Rue des Fournisseurs, Alger",
  bank: "Banque XYZ"
};

export const initialOperations = [
  { 
    id: 1, 
    name: "Découpage", 
    completed: false, 
    lots: [
      { id: 1, name: "Lot 01", available: true },
      { id: 2, name: "Lot 02", available: true },
      { id: 3, name: "Lot 05", available: true },
      { id: 4, name: "Lot 10", available: true },
      { id: 5, name: "Lot 15", available: true }
    ] 
  },
  { 
    id: 2, 
    name: "Soudure", 
    completed: false, 
    lots: [
      { id: 6, name: "Lot A", available: true },
      { id: 7, name: "Lot B", available: true },
      { id: 8, name: "Lot C", available: true }
    ] 
  },
  { 
    id: 3, 
    name: "Peinture", 
    completed: false, 
    lots: [
      { id: 9, name: "Lot Alpha", available: true },
      { id: 10, name: "Lot Beta", available: true },
      { id: 11, name: "Lot Gamma", available: true },
      { id: 12, name: "Lot Delta", available: true }
    ] 
  },
  { 
    id: 4, 
    name: "Montage", 
    completed: false, 
    lots: [] 
  }
];