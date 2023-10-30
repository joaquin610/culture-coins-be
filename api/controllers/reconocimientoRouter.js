
const controller = { 
    
    test: async (req, res) => {
    
            res.status(200).json({ 
                status: 'test',
                data: []
            })
},

}

module.exports = controller;