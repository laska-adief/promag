Promag adalah aplikasi yang mendukung ITSM di MIG perusahaan mengikuti standar ITIL. Salah satu masalah yang harus diselesaikan adalah manajemen aset, manajemen suku cadang dan manajemen konfigurasi. Aset, suku cadang, dan konfigurasi
penting, sistem harus dapat mengetahui suku cadang yang digunakan untuk setiap aset dan juga konfigurasi masing-masing aset. Skema penggantian dan lokasi aset dan cadangan bagian penting untuk mengukur ketersediaan aset dan suku cadang untuk mengakomodasi kebutuhan Layanan yang Dikelola Perangkat Keras.


Menggunakan json server sebagai api 
to start json server run command json-server --watch db.json

Credential login
username: admin
password : admin

Format input value for location for now input the locationId 1 | 2 | 3
  "locations": [
    {
      "locationId": "1",
      "name": "Yogyakarta"
    },
    {
      "locationId": "2",
      "name": "Jakarta"
    },
    {
      "locationId": "3",
      "name": "Bandung"
    }
  ]

Format input value for asset status for now input stopped | active | maintenance
Format input value for sparepart status for now input empty | full | notfull
