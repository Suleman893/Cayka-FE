export const deviceNameFormatter = brandEnum => {
  const mapping = {
    //Adaptors
    single_smart_adaptor: 'Single Smart Adaptor',
    double_smart_adaptor: 'Double Smart Adaptor',

    //Switches
    single_wall_switch: 'Single Wall Switch',
    double_wall_switch: 'Double Wall Switch',
    triple_wall_switch: 'Triple Wall Switch',
    led_dimmer: 'LED Dimmer',
    single_wall_switch_adaptor: 'Single Wall Switch (Adaptor Type)',
    double_wall_switch_adaptor: 'Double Wall Switch (Adaptor Type)',
    triple_wall_switch_adaptor: 'Triple Wall Switch (Adaptor Type)',
    smart_switch_led_dimmer_adaptor: 'Smart Switch for LED Dimmer (Adaptor Type)',

    //Lights
    smart_bulb_ble: 'Smart Bulb (BLE)',
    smart_bulb_ble_wifi: 'Smart Bulb (BLE + Wi-Fi)',
    rgb_bulb_ble: 'RGB Bulb (BLE)',
    rgb_bulb_ble_wifi: 'RGB Bulb (BLE + Wi-Fi)',
    rgb_led_strips_ble: 'RGB LED Strips (BLE)',
    rgb_led_strips_ble_wifi: 'RGB LED Strips (BLE + Wi-Fi)',

    //Sensors
    smart_door_sensor: 'Smart Door Sensor',
    temperature_humidity_sensor: 'Temperature & Humidity Sensor',
    motion_sensor_detector: 'Motion Sensor Detector',

    //Power Plugs
    single_wall_outlet_plug_adaptor: 'Single Wall Outlet Plug (Adaptor Type)',
    double_wall_outlet_plug_adaptor: 'Double Wall Outlet Plug (Adaptor Type)',
    wall_outlet_single: 'Wall Outlet Single',
    wall_outlet_double: 'Wall Outlet Double',

    //Motor
    smart_blinds_motor: 'Smart Blinds Motor',
    smart_switch_blind_motor_adaptor: 'Smart Switch for Blind Motor (Adaptor Type)',

    //Home Appliances
    smart_coffee_filter: 'Smart Coffee Filter',
    smart_kettle: 'Smart Kettle'
  }

  return mapping[brandEnum] || '-'
}
