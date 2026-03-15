"use strict"

module.exports = (err, req, res, next) => {
    // HATAYI TERMİNALDE GÖRMEK İÇİN BU SATIRI EKLEDİK:
    console.error("🔥 SİSTEM HATASI YAKALANDI:", err.message);

    res.status(res.errorStatusCode ?? 500).send({
        error: true,
        message: err.message,
        cause: err.cause
    })
}