import mongoose from 'mongoose'

const FeasibilitySchema = mongoose.Schema({
    client: { _id: String, name: String, email: String, phone: String, address: String },
    address: [String],
    gross_realisation_residential: Number,
    gross_realisation_commercial: Number,
    gross_realisation_total: Number,
    sales_commission: Number,
    construction_term: Number,
    sales_term: Number,
    total_term: Number,
    site_value: Number,
    stamp_duty: Number,
    construction: Number,
    contingency: Number,
    professional_cost: Number,
    council_contributions: Number,
    establishment_fee: Number,
    marketing_cost: Number,
    holding_cost: Number,
    interest_rate: Number,
    line_fee: Number,
    gst_margin_scheme: Number,
    type: String,
    creator: [String],
    owner: [String],
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const FeasibilityModel = mongoose.model('FeasibilityModel', FeasibilitySchema)
export default FeasibilityModel