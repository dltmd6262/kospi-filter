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
  highest: u32,
  lowest: u32,
}

#[derive(Serialize, Deserialize)]
pub struct CompanyTradeInfo {
  name: String,
  trade_infos: Vec<DailyTradeInfo>,
}

#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub struct MovingAverageInfo {
  name: String,
  five: u32,
}

#[wasm_bindgen]
impl MovingAverageInfo {
  #[wasm_bindgen(getter)]
  pub fn name(&self) -> String {
    self.name.clone()
  }

  #[wasm_bindgen(getter)]
  pub fn five(&self) -> u32 {
    self.five
  }
}

#[wasm_bindgen]
pub fn calculate_moving_average(js_obj: &JsValue) -> MovingAverageInfo {
  let trade_info: CompanyTradeInfo = js_obj.into_serde().unwrap();

  MovingAverageInfo {
    name: "yes".to_owned(),
    five: 10,
  }
}
