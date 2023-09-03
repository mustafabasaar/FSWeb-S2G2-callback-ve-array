const { fifaData } = require("./fifa.js");

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)

//(e) 2014 Dünya kupası finali kazananı*/

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(data) {
  const finalMAtchs = data.filter((item) => item.Stage === "Final");
  return finalMAtchs;
}
console.log("Görev 2 sonuç:", Finaller(fifaData));

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: git status
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(data, callBack) {
  const finalYears = callBack(data).map((item) => item["Year"]);
  return finalYears;
}
console.log("görev 3 sonuç:", Yillar(fifaData, Finaller));
/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

function Kazananlar(data, callback) {
  const teamWin = callback(data).map((item) => {
    if (item["Home Team Goals"] > item["Away Team Goals"])
      return item["Home Team Name"];
    else {
      return item["Away Team Name"];
    }
  });
  return teamWin;
}

console.log(Kazananlar(fifaData, Finaller));

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(data, cb, cb2, cb3) {
  const allfinalYears = cb2(data, cb);
  const allWiners = cb3(data, cb);
  const winersinYears = allfinalYears.map((yil, index) => {
    return `${yil} yılında, ${allWiners[index]} dünya kupasını kazandı!`;
  });
  return winersinYears;
}
console.log(
  "görev 5 sonuç",
  YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar)
);
/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(birFonksiyon) {
  const finalMaclariDizisi = birFonksiyon;
  const toplamGolSayisi = finalMaclariDizisi.reduce((acc, mac) => {
    console.log(mac["Away Team Goals"], mac["Home Team Goals"]);

    return acc + mac["Home Team Goals"] + mac["Away Team Goals"];
  }, 0);

  const ortalamaGolSayisi = toplamGolSayisi / finalMaclariDizisi.length;

  return ortalamaGolSayisi.toFixed(2);
}
console.log("görev 6 sonuç: ", OrtalamaGolSayisi(Finaller(fifaData)));

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(data) {
  let winnerteamFinals = [];
  for (let match of Finaller(data)) {
    if (match["Home Team Goals"] > match["Away Team Goals"]) {
      winnerteamFinals.push(match["Home Team Initials"]);
    } else {
      winnerteamFinals.push(match["Away Team Initials"]);
    }
  }
  const winnerCount = winnerteamFinals.reduce((acc, currentValue) => {
    if (acc[currentValue] === undefined) {
      acc[currentValue] = 1;
    } else {
      acc[currentValue]++;
    }
    return acc;
  }, {});
  return winnerCount;
}
console.log("bonus 1 sonuç:", UlkelerinKazanmaSayilari(fifaData));
/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(data) {
  finalMatches = Finaller(data);
  toplamGol = finalMatches.reduce((acc, currentValue) => {
    acc[currentValue["Home Team Initials"]] =
      (acc[currentValue["Home Team Initials"]] || 0) +
      currentValue["Home Team Goals"];
    acc[currentValue["Away Team Initials"]] =
      (acc[currentValue["Away Team Initials"]] || 0) +
      currentValue["Away Team Goals"];
    return acc;
  }, {});
  const siraliGol = Object.keys(toplamGol).sort(
    (a, b) => toplamGol[b] - toplamGol[a]
  );

  return siraliGol[0];
}

console.log("bonus 2 sonuç:", EnCokGolAtan(fifaData));
/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(data) {
  finalMatches = Finaller(data);
  toplamgolYenen = finalMatches.reduce((acc, currentValue) => {
    acc[currentValue["Home Team Initials"]] =
      (acc[currentValue["Home Team Initials"]] || 0) +
      currentValue["Away Team Goals"];
    acc[currentValue["Away Team Initials"]] =
      (acc[currentValue["Away Team Initials"]] || 0) +
      currentValue["Home Team Goals"];
    return acc;
  }, {});
  console.log("kontrol noktası:", toplamgolYenen);
  const siraliyenenGol = Object.keys(toplamgolYenen).sort(
    (a, b) => toplamgolYenen[b] - toplamgolYenen[a]
  );

  return siraliyenenGol[0];
}
console.log("bonus 3 sonuç:", EnKotuDefans(fifaData));
/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */

/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
  console.log("Kodlar çalışıyor");
  return "as";
}
sa();
module.exports = {
  sa,
  Finaller,
  Yillar,
  Kazananlar,
  YillaraGoreKazananlar,
  OrtalamaGolSayisi,
};
