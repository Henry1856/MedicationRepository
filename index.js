const express = require('express');
const app = express();
app.use(express.json());

const PORT  = process.env.PORT || 5000;
app.use(express.json());

app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}`)
})

const drugs = [
  { id: 1, name: "Amoxicillin", category: "Antibiotic", dosageMg: 500, isPrescriptionOnly: true, stock: 120, manufacturer: "Pfizer" },
  { id: 2, name: "Paracetamol", category: "Analgesic", dosageMg: 1000, isPrescriptionOnly: false, stock: 200, manufacturer: "GSK" },
  { id: 3, name: "Ibuprofen", category: "Analgesic", dosageMg: 400, isPrescriptionOnly: false, stock: 150, manufacturer: "Bayer" },
  { id: 4, name: "Chloroquine", category: "Antimalarial", dosageMg: 250, isPrescriptionOnly: true, stock: 80, manufacturer: "Sanofi" },
  { id: 5, name: "Ciprofloxacin", category: "Antibiotic", dosageMg: 500, isPrescriptionOnly: true, stock: 70, manufacturer: "Pfizer" },
  { id: 6, name: "Loratadine", category: "Antihistamine", dosageMg: 10, isPrescriptionOnly: false, stock: 160, manufacturer: "Novartis" },
  { id: 7, name: "Metformin", category: "Antidiabetic", dosageMg: 850, isPrescriptionOnly: true, stock: 140, manufacturer: "Teva" },
  { id: 8, name: "Artemether", category: "Antimalarial", dosageMg: 20, isPrescriptionOnly: true, stock: 60, manufacturer: "Roche" },
  { id: 9, name: "Aspirin", category: "Analgesic", dosageMg: 200, isPrescriptionOnly: false, stock: 180, manufacturer: "Bayer" },
  { id: 10, name: "Omeprazole", category: "Antacid", dosageMg: 250, isPrescriptionOnly: true, stock: 50, manufacturer: "AstraZeneca" },
  { id: 11, name: "Azithromycin", category: "Antibiotic", dosageMg: 500, isPrescriptionOnly: true, stock: 90, manufacturer: "Pfizer" },
  { id: 12, name: "Cetirizine", category: "Antihistamine", dosageMg: 10, isPrescriptionOnly: false, stock: 110, manufacturer: "Novartis" },
  { id: 13, name: "Insulin", category: "Antidiabetic", dosageMg: 100, isPrescriptionOnly: true, stock: 30, manufacturer: "Novo Nordisk" },
  { id: 14, name: "Artemisinin", category: "Antimalarial", dosageMg: 100, isPrescriptionOnly: true, stock: 50, manufacturer: "GSK" },
  { id: 15, name: "Codeine", category: "Analgesic", dosageMg: 500, isPrescriptionOnly: true, stock: 300, manufacturer: "Nature's Bounty" },
  { id: 16, name: "Vitamin C", category: "Supplement", dosageMg: 500, isPrescriptionOnly: false, stock: 90, manufacturer: "Sanofi" }
];

app.get('/drugs/antibiotics', (req, res) => {
    const anti = drugs.filter(drug=>drug.category == "Antibiotic"); 
  res.json(anti);
});

app.get('/names',(req , res)=>{
    const name = drugs.filter(drug=>drug.category == "Antibiotic")
    .map(drug=>drug.name.toLowerCase())
    res.json(name)
})

app.get('/drugs/names',(req , res)=>{
    const manufacturer = drugs.map(drug=>({
        name: drug.name,
        manufacturer: drug.manufacturer
    }));

    
    res.json(manufacturer)
})


app.post('/add',(req , res)=>{
    const {category} = req.body
    if(!category){
        return res.json('please enter a category....')
    }
    const newDrug = drugs.filter((drug)=> drug.category === category)
    res.json(newDrug)

})




