import type { SubCategory } from '@/modules/category/categoryType';
import { AttributeInputTypes } from '@/modules/category/categoryType';

import {
  graphicsCardOptions,
  laptopManufacturerOptions,
  monitorManufacturerOptions,
  osOptions,
  phoneBrands,
  printerAndScannerManufacturerOptions,
  processorOptions,
  ramOptions,
  refreshRate,
  resolutionOptions,
  screenType,
  soundManufacturerOptions,
  storageManufacturerOptions,
  storageOptions,
  storageTypeOptions,
  televisionManufacturerOptions,
} from './reusableOptions';

export const subcategorieMobileAndTablets: SubCategory = {
  uid: 'mobile-and-tablets',
  label: 'Mobile and Tablets',
  inputs: [
    {
      uid: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.SELECT,
      options: phoneBrands,
    },
    {
      uid: 'model',
      label: 'Modèle',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      label: 'Fréquence de rafraîchissement',
      uid: 'refresh-rate',
      inputType: AttributeInputTypes.SELECT,
      options: refreshRate,
    },
    {
      uid: 'network',
      label: 'Réseau',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '2g', label: '2G' },
        { value: '3g', label: '3G' },
        { value: '4g', label: '4G' },
        { value: '5g', label: '5G' },
      ],
    },
    {
      uid: 'stockage',
      label: 'Stockage',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '16go-', label: '< de 16 GO' },
        { value: '16-32go', label: '16-32 GO' },
        { value: '32-64go', label: '32-64 GO' },
        { value: '64-128go', label: '64-128 GO' },
        { value: '128-256go', label: '128-256 GO' },
        { value: '256go+', label: '> 256 GO' },
      ],
    },
    {
      uid: 'ram',
      label: 'RAM',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '2gb-', label: '< 2 Go' },
        { value: '2-4gb', label: '2 - 4 Go' },
        { value: '4-8gb', label: '4 - 8 Go' },
        { value: '8-12gb', label: '8 - 12' },
        { value: '12gb+', label: '> 12 Go' },
      ],
    },

    {
      uid: 'os',
      label: "Système d'exploitation",
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'android', label: 'Android' },
        { value: 'ios', label: 'iOS' },
        { value: 'windows', label: 'Windows' },
        { value: 'other', label: 'Autre' },
      ],
    },
    {
      uid: 'screen-size',
      label: "Taille d'écran",
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '4-', label: 'Moins de 4 pouces' },
        { value: '4-5', label: '4-5 pouces' },
        { value: '5-6', label: '5-6 pouces' },
        { value: '6-7', label: '6-7 pouces' },
        { value: '7-8', label: '7-8 pouces' },
        { value: '8-9', label: '8-9 pouces' },
        { value: '9-10', label: '9-10 pouces' },
        { value: '10-11', label: '10-11 pouces' },
        { value: '11-12', label: '11-12 pouces' },
        { value: '12-13', label: '12-13 pouces' },
        { value: '13+', label: 'Plus de 13 pouces' },
      ],
    },
    {
      uid: 'screen-resolution',
      label: "Résolution d'écran",
      inputType: AttributeInputTypes.SELECT,
      options: resolutionOptions,
    },
    {
      uid: 'screen-type',
      label: "Type d'écran",
      inputType: AttributeInputTypes.SELECT,
      options: screenType,
    },
    {
      label: "Résolution de l'appareil photo face arrière",
      uid: 'camera-resolution',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '3mp-', label: '< 3 MP' },
        { value: '3-8mp', label: '3 - 8 MP' },
        { value: '8-16mp', label: '8 - 16 MP' },
        { value: '16-50mp', label: '16 - 50 MP' },
        { value: '50mp+', label: '> 50 MP' },
      ],
    },
    {
      label: "Résolution de l'appareil photo face avant",
      uid: 'front-camera-resolution',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '3mp-', label: '< 3 MP' },
        { value: '3-8mp', label: '3 - 8 MP' },
        { value: '8-16mp', label: '8 - 16 MP' },
        { value: '16-50mp', label: '16 - 50 MP' },
        { value: '50mp+', label: '> 50 MP' },
      ],
    },
    {
      label: 'Type de connecteur',
      uid: 'connector-type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'usb-c', label: 'USB-C' },
        { value: 'micro-usb', label: 'Micro USB' },
        { value: 'lightning', label: 'Lightning' },
        { value: 'jack', label: 'Jack' },
      ],
    },
  ],
};

export const subcategorieLaptop: SubCategory = {
  uid: 'laptop',
  label: 'Ordinateur portable',
  inputs: [
    {
      uid: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.SELECT,
      options: laptopManufacturerOptions,
    },
    {
      uid: 'model',
      label: 'Modèle',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'ram',
      label: 'RAM',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '2gb-', label: '< 2 Go' },
        { value: '4gb', label: '4 Go' },
        { value: '8gb', label: '8 Go' },
        { value: '16gb', label: '16 Go' },
        { value: '32gb', label: '32 Go' },
        { value: '32gb+', label: '> 32 Go' },
      ],
    },
    {
      uid: 'storage',
      label: 'Stockage',
      inputType: AttributeInputTypes.SELECT,
      options: storageOptions,
    },
    {
      uid: 'storageType',
      label: 'Type de stockage',
      inputType: AttributeInputTypes.SELECT,
      options: storageTypeOptions,
    },
    {
      uid: 'screen-size',
      label: "Taille d'écran",
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '10-', label: 'Moins de 10 pouces' },
        { value: '10-11', label: '10-11 pouces' },
        { value: '11-12', label: '11-12 pouces' },
        { value: '12-13', label: '12-13 pouces' },
        { value: '13-14', label: '13-14 pouces' },
        { value: '14-15', label: '14-15 pouces' },
        { value: '15-16', label: '15-16 pouces' },
        { value: '16-17', label: '16-17 pouces' },
        { value: '17+', label: 'Plus de 17 pouces' },
      ],
    },
    {
      uid: 'screen-resolution',
      label: "Résolution d'écran",
      inputType: AttributeInputTypes.SELECT,
      options: resolutionOptions,
    },
    {
      uid: 'screen-type',
      label: "Type d'écran",
      inputType: AttributeInputTypes.SELECT,
      options: screenType,
    },
    {
      label: 'Type',
      uid: 'type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'ultrabook', label: 'Ultrabook' },
        { value: 'gaming', label: 'Gaming' },
        { value: 'convertible', label: 'Convertible' },
        { value: '2-en-1', label: '2-en-1' },
        { value: 'chromebook', label: 'Chromebook' },
        { value: 'workstation', label: 'Workstation' },
        { value: 'netbook', label: 'Netbook' },
      ],
    },
    {
      label: 'Marque Processeur',
      uid: 'processorType',
      inputType: AttributeInputTypes.SELECT,
      options: processorOptions,
    },
    {
      label: 'Marque Carte graphique',
      uid: 'graphics-card-brand',
      inputType: AttributeInputTypes.SELECT,
      options: graphicsCardOptions,
    },
    {
      label: 'Processeur',
      uid: 'processor',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      label: 'Carte graphique',
      uid: 'graphics-card',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      label: "Système d'exploitation",
      uid: 'os',
      inputType: AttributeInputTypes.SELECT,
      options: osOptions,
    },
    {
      label: 'Poids',
      uid: 'weight',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '1kg-', label: '< 1 kg' },
        { value: '1-2kg', label: '1 - 2 kg' },
        { value: '2-3kg', label: '2 - 3 kg' },
        { value: '3+kg', label: '> 3 kg' },
      ],
    },
    {
      label: 'Fréquence de rafraîchissement',
      uid: 'refresh-rate',
      inputType: AttributeInputTypes.SELECT,
      options: refreshRate,
    },
  ],
};

export const subcategorieComputer: SubCategory = {
  uid: 'computer',
  label: 'Ordinateur de bureau',
  inputs: [
    {
      uid: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.SELECT,
      options: laptopManufacturerOptions,
    },
    {
      uid: 'model',
      label: 'Modèle',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'ram',
      label: 'RAM',
      inputType: AttributeInputTypes.SELECT,
      options: ramOptions,
    },
    {
      uid: 'storage',
      label: 'Stockage',
      inputType: AttributeInputTypes.SELECT,
      options: storageOptions,
    },
    {
      uid: 'storageType',
      label: 'Type de stockage',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'ssd', label: 'SSD' },
        { value: 'hdd', label: 'HDD' },
      ],
    },
    {
      label: 'Marque Processeur',
      uid: 'processorType',
      inputType: AttributeInputTypes.SELECT,
      options: processorOptions,
    },
    {
      label: 'Marque Carte graphique',
      uid: 'graphics-card-brand',
      inputType: AttributeInputTypes.SELECT,
      options: graphicsCardOptions,
    },
    {
      label: 'Processeur',
      uid: 'processor',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      label: 'Carte graphique',
      uid: 'graphics-card',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      label: "Système d'exploitation",
      uid: 'os',
      inputType: AttributeInputTypes.SELECT,
      options: osOptions,
    },
  ],
};

export const subcategorieStorage: SubCategory = {
  uid: 'storage',
  label: 'Stockage',
  inputs: [
    {
      uid: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.SELECT,
      options: storageManufacturerOptions,
    },
    {
      uid: 'model',
      label: 'Modèle',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'storage',
      label: 'Stockage',
      inputType: AttributeInputTypes.SELECT,
      options: storageOptions,
    },
    {
      uid: 'storageType',
      label: 'Type de stockage',
      inputType: AttributeInputTypes.SELECT,
      options: storageTypeOptions,
    },
  ],
};

export const subcategoriePrinterAndScanner: SubCategory = {
  uid: 'printer-and-scanner',
  label: 'Imprimante et scanner',
  inputs: [
    {
      uid: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.SELECT,
      options: printerAndScannerManufacturerOptions,
    },
    {
      uid: 'model',
      label: 'Modèle',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'type',
      label: 'Type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'imprimante', label: 'Imprimante' },
        { value: 'scanner', label: 'Scanner' },
        { value: 'imprimante-scanner', label: 'Imprimante et scanner' },
      ],
    },
    {
      uid: 'max-scan-resolution',
      label: 'Résolution maximale de scan',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '300dpi', label: '300 dpi' },
        { value: '600dpi', label: '600 dpi' },
        { value: '1200dpi', label: '1200 dpi' },
        { value: '2400dpi', label: '2400 dpi' },
        { value: '4800dpi', label: '4800 dpi' },
        { value: '4800dpi+', label: '6400 x 9600 dpi' },
      ],
    },
    {
      uid: 'print-speed',
      label: "Vitesse d'impression",
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '4-10ppm', label: '10 ppm' },
        { value: '10-20ppm', label: '20 ppm' },
        { value: '20-30ppm', label: '30 ppm' },
        { value: '30-40ppm', label: '40 ppm' },
        { value: '40-50ppm', label: '50 ppm' },
        { value: '50+ppm', label: '50 ppm +' },
      ],
    },
    {
      uid: 'print-resolution',
      label: "Résolution d'impression",
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '300dpi', label: '300 dpi' },
        { value: '600dpi', label: '600 dpi' },
        { value: '1200dpi', label: '1200 dpi' },
        { value: '2400dpi', label: '2400 dpi' },
        { value: '4800dpi', label: '4800 dpi' },
        { value: '4800dpi+', label: '6400 x 9600 dpi' },
      ],
    },
  ],
};

export const subcategorieMonitor: SubCategory = {
  uid: 'monitor',
  label: 'Moniteur',
  inputs: [
    {
      uid: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.SELECT,
      options: monitorManufacturerOptions,
    },
    {
      uid: 'model',
      label: 'Modèle',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'size',
      label: 'Taille',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '15-20', label: '15-20 pouces' },
        { value: '20-24', label: '20-24 pouces' },
        { value: '24-27', label: '24-27 pouces' },
        { value: '27-30', label: '27-30 pouces' },
        { value: '30+', label: '30 pouces +' },
      ],
    },
    {
      uid: 'resolution',
      label: 'Résolution',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '720p', label: '720p' },
        { value: '1080p', label: '1080p' },
        { value: '1440p', label: '1440p' },
        { value: '2160p', label: '2160p' },
        { value: '4320p', label: '4320p' },
      ],
    },
    {
      uid: 'refresh-rate',
      label: 'Taux de rafraîchissement',
      inputType: AttributeInputTypes.SELECT,
      options: refreshRate,
    },
    {
      uid: 'response-time',
      label: 'Temps de réponse',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '1-5ms', label: '1-5 ms' },
        { value: '5-10ms', label: '5-10 ms' },
        { value: '10-15ms', label: '10-15 ms' },
        { value: '15-20ms', label: '15-20 ms' },
        { value: '20-25ms', label: '20-25 ms' },
        { value: '25-30ms', label: '25-30 ms' },
        { value: '30-35ms', label: '30-35 ms' },
        { value: '35-40ms', label: '35-40 ms' },
        { value: '40-45ms', label: '40-45 ms' },
        { value: '45-50ms', label: '45-50 ms' },
        { value: '50-55ms', label: '50-55 ms' },
        { value: '55-60ms', label: '55-60 ms' },
        { value: '60-65ms', label: '60-65 ms' },
        { value: '65-70ms', label: '65-70 ms' },
        { value: '70-75ms', label: '70-75 ms' },
        { value: '75-80ms', label: '75-80 ms' },
        { value: '80-85ms', label: '80-85 ms' },
      ],
    },
    {
      uid: 'panel-type',
      label: 'Type de panneau',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'ips', label: 'IPS' },
        { value: 'va', label: 'VA' },
        { value: 'tn', label: 'TN' },
        { value: 'oled', label: 'OLED' },
      ],
    },
    {
      uid: 'curved',
      label: 'Courbé',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'yes', label: 'Oui' },
        { value: 'no', label: 'Non' },
      ],
    },
    {
      uid: 'g-sync',
      label: 'G-Sync',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'yes', label: 'Oui' },
        { value: 'no', label: 'Non' },
      ],
    },
    {
      uid: 'free-sync',
      label: 'Free-Sync',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'yes', label: 'Oui' },
        { value: 'no', label: 'Non' },
      ],
    },
    {
      uid: 'vrr',
      label: 'VRR',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'yes', label: 'Oui' },
        { value: 'no', label: 'Non' },
      ],
    },
    {
      uid: 'hdr',
      label: 'HDR',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'yes', label: 'Oui' },
        { value: 'no', label: 'Non' },
      ],
    },
  ],
};

export const subcategorieTelevision: SubCategory = {
  uid: 'television',
  label: 'Télévision',
  inputs: [
    {
      uid: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.SELECT,
      options: televisionManufacturerOptions,
    },
    {
      uid: 'model',
      label: 'Modèle',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      label: "Type d'écran",
      uid: 'screen-type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'oled', label: 'OLED' },
        { value: 'led', label: 'LED' },
        { value: 'lcd', label: 'LCD' },
        { value: 'qled', label: 'QLED' },
        { value: 'plasma', label: 'Plasma' },
      ],
    },
    {
      uid: 'size',
      label: 'Taille',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '15-20', label: '15-20 pouces' },
        { value: '20-24', label: '20-24 pouces' },
        { value: '24-27', label: '24-27 pouces' },
        { value: '27-30', label: '27-30 pouces' },
        { value: '30-32', label: '30-32 pouces' },
        { value: '32-35', label: '32-35 pouces' },
        { value: '35-40', label: '35-40 pouces' },
        { value: '40-45', label: '40-45 pouces' },
        { value: '45-50', label: '45-50 pouces' },
        { value: '50-55', label: '50-55 pouces' },
        { value: '55-60', label: '55-60 pouces' },
        { value: '60-65', label: '60-65 pouces' },
        { value: '65-70', label: '65-70 pouces' },
        { value: '70-75', label: '70-75 pouces' },
        { value: '75-80', label: '75-80 pouces' },
        { value: '80-85', label: '80-85 pouces' },
        { value: '85+', label: '85 pouces et plus' },
      ],
    },
    {
      uid: 'resolution',
      label: 'Résolution',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '-1080p', label: '< 1080p' },
        { value: '4k', label: '4K' },
        { value: '8k', label: '8K' },
        { value: '1080p', label: '1080p' },
      ],
    },
    {
      uid: 'refresh-rate',
      label: 'Taux de rafraîchissement',
      inputType: AttributeInputTypes.SELECT,
      options: refreshRate,
    },
    {
      uid: 'width',
      label: 'Largeur cm',
      inputType: AttributeInputTypes.NUMBER,
    },
    {
      uid: 'height',
      label: 'Hauteur cm',
      inputType: AttributeInputTypes.NUMBER,
    },
    {
      uid: 'incurved',
      label: 'Incurvé',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'yes', label: 'Oui' },
        { value: 'no', label: 'Non' },
      ],
    },
  ],
};

export const subcategorieSound: SubCategory = {
  uid: 'sound',
  label: 'Son',
  inputs: [
    {
      uid: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.SELECT,
      options: soundManufacturerOptions,
    },
    {
      uid: 'model',
      label: 'Modèle',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'type',
      label: 'Type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'soundbar', label: 'Barre de son' },
        { value: 'home-cinema', label: 'Home-cinema' },
        { value: 'headphone', label: 'Casque' },
        { value: 'earphone', label: 'Ecouteur' },
        { value: 'speaker', label: 'Enceinte' },
        { value: 'microphone', label: 'Microphone' },
        { value: 'turntable', label: 'Tourne-disque' },
        { value: 'amplifier', label: 'Amplificateur' },
        { value: 'receiver', label: 'Récepteur' },
        { value: 'subwoofer', label: 'Subwoofer' },
      ],
    },
    {
      label: 'Sans fil',
      uid: 'wireless',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'yes', label: 'Oui' },
        { value: 'no', label: 'Non' },
      ],
    },
  ],
};
