/*
 |--------------------------------------------------------------------------
 | Setup
 |--------------------------------------------------------------------------
 */
//Controllers
const Controllers = {
    InspectionDetailController: require(_directory_base + '/app/v1.0/Http/Controllers/InspectionDetailController.js')
}
module.exports = (app) => {

    /*
    |--------------------------------------------------------------------------
    | Welcome Message
    |--------------------------------------------------------------------------
    */
    app.get('/', (req, res) => {
        return res.json({
            application: {
                name: 'MSA Testing Inspection',
                env: config.app.env,
                port: config.app.port[config.app.env]
            }
        })
    });

    /*
    |--------------------------------------------------------------------------
    | Versi 1.0
    |--------------------------------------------------------------------------
    */
    app.post('/api/v1.1/detail', Controllers.InspectionDetailController.create);
    app.get('/api/v1.1/detail', Controllers.InspectionDetailController.find_one);
}
