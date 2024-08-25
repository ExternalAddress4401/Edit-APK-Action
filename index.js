const fs = require("fs");

let manifest = fs.readFileSync("./beatstar/AndroidManifest.xml").toString();
manifest = manifest.replace(
  '<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>',
  `<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.MANAGE_EXTERNAL_STORAGE" />`
);
manifest = manifest.replace(
  'android:networkSecurityConfig="@xml/network_security_config"',
  ""
);

try {
  fs.unlinkSync("./beatstar/res/xml/network_security_config.xml");
} catch (e) {}

let res = fs.readFileSync("./beatstar/res/values/public.xml").toString();
res = res.replace(
  '<public type="xml" name="network_security_config" id="0x7f150004" />',
  ""
);

fs.writeFileSync("./beatstar/AndroidManifest.xml", manifest);
fs.writeFileSync("./beatstar/res/values/public.xml", res);
