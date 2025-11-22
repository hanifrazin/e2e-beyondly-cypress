Feature: E2E Buy Product at Beyondly e-commerce

@register @positive
Scenario: Verify user should be able to Register account 
Given user has open link https://recruitment-staging-queenbee.paradev.io at chrome browser
When user click "Daftar" menu
And user input Nama Lengkap is "Hanif"
And user input No HP is "85778475279"
And user input password is "BurgerC8$"
And user click "Daftar" button
And user choose WhatsApp at Metode Verifikasi pop up
And user input kode verifikasi is 123456
And user click Kirim button
Then user should be redirect to https://recruitment-staging-queenbee.paradev.io/verification-success
And user automatically redirect again to https://recruitment-staging-queenbee.paradev.io/shop 
And user should be see tool tip Alamat Penerima has been displayed


@login @positive
Scenario: Verify user should be able to Login with valid Nomor HP
Given user has open link https://recruitment-staging-queenbee.paradev.io at chrome browser
And user has create account successfully using Nomor HP
When user click "Masuk" menu
And user input No HP is 85778475279
And user input Password is BurgerC8$
And user click "Masuk" button
And user choose WhatsApp at Metode Verifikasi pop up
And user input kode verifikasi is 123456
And user click Kirim button
Then user should be redirect to https://recruitment-staging-queenbee.paradev.io/verification-success
And user automatically redirect again to https://recruitment-staging-queenbee.paradev.io/shop 
And user should be see tool tip Alamat Penerima has been displayed

@alamat @positive
Scenario: Verify user should be able to input Alamat Penerima
Given user has successfully login 
When user see Alamat Penerima tooltip has been displayed
And user click "Isi Alamat"
And user click "+ Alamat Baru" button
And user input Label Alamat is "My Home"
And user input Nama Penerima is "Hanif"
And user input No HP Penerima is "85778475279"
And user select Provinsi is "Banten"
And user select Kota/Kabupaten is "Kab. Lebak"
And user select Kecamatan is "Banjarsari"
And user select Kelurahan/Desa is "Bendungan"
And user input Alamat Lengkap is "Jl. Ahmad Yani No 5 RT 010/RW 011, Kel. Bendungan, Kec. Banjarsari, Kab. Lebak"
And user check Jadikan Alamat Utama checkbox
And user click Simpan Alamat button
Then user should be see pop up with message is "Alamat berhasil ditambah"
And user should be see wording location has been changed to "Kirim ke Banten"


@cart @positive
Scenario: Verify user should be able to add an item to cart
Given user has successfully login using valid nomor HP
When user go to https://recruitment-staging-queenbee.paradev.io/home
And user scroll down to "Koleksi Baru" section
And user select one of item at 1st card
And user click "+ Keranjang" button
And user click cart menu 
Then user should be see an item has been success add in cart menu

@checkout @positive
Scenario: Verify user should be able to checkout 
Given user has successfully login using valid nomor HP
And user has add an item to cart
When user click cart menu
And user check all item
And user click "Beli Sekarang" button
Then user should be redirect to https://recruitment-staging-queenbee.paradev.io/checkout/shipping

@toolTip @CekPesanan @positive
Scenario: Verify user should be able to complete all tooltips at Cek Pesanan
Given user has already at https://recruitment-staging-queenbee.paradev.io/checkout/shipping
When user click "Selanjutnya" button at 1st Tooltip 
And user click "Selanjutnya" button at 2nd Tooltip 
And user click "Selanjutnya" button at 3rd Tooltip 
And user click "Selesai" button
Then user should be see all tooltips will be clear

@jasaPengiriman @CekPesanan @positive
Scenario: Verify user should be able to select Jasa Pengiriman at Cek Pesanan
Given user has already at https://recruitment-staging-queenbee.paradev.io/checkout/shipping
And user has already complete all tooltips which displayed
When user click "Pilih Layanan Pengiriman"
And user click "Regular" option
And user click "JNE" option
Then user should be see kurir information at "Jasa Pengiriman" will be displayed based on selected
And user should be see wording at button has change to "Pilih Pembayaran"

@CekPesanan @positive
Scenario: Verify user should be able to choose Pilih Pembayaran at Cek Pesanan
Given user has already at https://recruitment-staging-queenbee.paradev.io/checkout/shipping
And user has already complete all tooltips which displayed
And user has already choose "Jasa Pengiriman"
When user click "Pilih Pembayaran"
And user click "Transfer Bank"
And user click "Mandiri Virtual Account"
And user click "Bayar Pesanan" button
Then user should be successfull redirect to checkout payment-detail page