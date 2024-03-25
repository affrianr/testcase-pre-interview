Bug:

1. tag script javascript tidak berada di dalam body sehingga tidak bekerja.
2. terkadang data car yang diinput pada tiap fungsi undefined, solusinya adalah menambahkan "?" pada data car tiap kali dipanggil
3. menambahkan class parking-tobdy pada element tbody
4. mengubah kondisi pada loop, for (var i = 0; i <= cars?.length; i++) menjadi i < cars?.length
5. untuk mengurutkan posisi mobil ke urutan yang terbaru, maka loop menjadi for (var i = cars.length - 1; i >= 0; i--)
6. terdapat bug pada saat car terakhir keluar dari parkiran yaitu tidak langsung render ulang, padahal panjang array car sudah menjadi 0. maka perlu dikasih kondisi if (cars.length >= 0), sehingga kode renderTable menjadi:
   if (cars.length >= 0) {
   let results = "";
   for (var i = cars.length - 1; i >= 0; i--) {
   let licensee = cars[i]?.licensee;
   let arrival = formatDate(cars[i]?.arrival);
   let leave = cars[i]?.leave === "-" ? "-" : formatDate(cars[i]?.leave);
   results += `<tr>
      <td>${licensee}</td>
      <td>${arrival}</td>
      <td>${leave}</td>
      <td>${showStatus(cars[i])}</td>
      <td class="text-right">${makeBill(cars[i])}</td>
      <td class="text-right">
        <button data-row="${i}" onclick="showSummary(event)" data-toggle="modal" data-target="#myModal" class="btn btn-sm btn-success">Summary</button>
                </td>
    </tr>`;
   }
   document.querySelector("#parking-tbody").innerHTML = results;
   }
