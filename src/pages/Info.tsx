export const Info = () => (
  <ul>
    <li>
      BE/DB? - Nincs autorizáció, csak néhány adatot kell tárolni user specifikusan, ezért local
      storage
    </li>
    <li>
      Nyeremények - Az biztos, hogy az üzemeltető nyereséges, már ha bárki vesz jegyeket. A feladat
      leírás szerencsére nem igényelte, hogy a játékosok számára vonzó risk/reward arány legyen
    </li>
    <li>
      Rendezések - Nem volt teljesen tiszta, hogy ki, mi alapján tudjon rendezni, jelenleg csak a
      találatok száma/nyeremény mértéké alapján lehet, amíg nem kattint a gombra, addig felvétel
      sorrendjében van (üzemeltető részről mindig elöl a játékos szelvényei)
    </li>
    <li>Host - Csak egy React app, ezért github pages</li>
  </ul>
);
