use console_error_panic_hook;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, this uses `wee_alloc` as the global
// allocator.
//
// If you don't want to use `wee_alloc`, you can safely delete this.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[macro_use]
extern crate serde_derive;

#[derive(Serialize, Deserialize)]
pub struct DailyTradeInfo {
  pub highest: u32,
  pub lowest: u32,
}

#[derive(Serialize, Deserialize)]
pub struct CompanyTradeInfo {
  pub trade_infos: Vec<DailyTradeInfo>,
}

#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub struct MovingAverageInfo {
  pub five: u32,
  pub ten: u32,
  pub twenty: u32,
  pub thirty: u32,
  pub sixty: u32,
  pub onetwenty: u32,
  pub twoforty: u32,
}

#[wasm_bindgen]
pub fn calculate_moving_average(js_obj: &JsValue) -> MovingAverageInfo {
  console_error_panic_hook::set_once();

  let data = js_obj.into_serde::<CompanyTradeInfo>().unwrap().trade_infos;
  let mut res = MovingAverageInfo {
    five: 0,
    ten: 0,
    twenty: 0,
    thirty: 0,
    sixty: 0,
    onetwenty: 0,
    twoforty: 0,
  };
  let mut sum = 0;
  for (idx, info) in data.iter().enumerate() {
    sum = sum + info.highest;

    match idx + 1 {
      5 => res.five = sum / 5,
      10 => res.ten = sum / 10,
      20 => res.twenty = sum / 20,
      30 => res.thirty = sum / 30,
      60 => res.sixty = sum / 60,
      120 => res.onetwenty = sum / 120,
      240 => res.twoforty = sum / 240,
      _ => (),
    };
  }

  res
}
