// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[cfg(target_os = "macos")]
#[macro_use]
extern crate cocoa;

#[cfg(target_os = "macos")]
#[macro_use]
extern crate objc;

#[cfg(target_os = "macos")]
mod mac;

#[cfg(target_os = "windows")]
mod win;

mod interceptor;
mod interop;

use tauri::Emitter;
// use tauri::Manager;

fn main() {
    // test_app_lib::run()
    tauri_plugin_deep_link::prepare("io.hoppscotch.desktop");

    tauri::Builder::default()
        // .plugin(tauri_plugin_localhost::Builder::new(todo!()).build())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            interop::startup::init::interop_startup_init
        ])
        .plugin(
            tauri_plugin_window_state::Builder::default()
                .with_state_flags(
                    // NOTE:
                    // The app (window labeled "main") manages its visible state via `interop_startup_init`.
                    // See `tauri.conf.json`:
                    // ```json
                    // {
                    //   "label": "main",
                    //   "title": "Hoppscotch",
                    //   ...
                    //   ...
                    //   "visible": false, // This is the important part.
                    //   ...
                    //   ...
                    // }
                    // ```
                    tauri_plugin_window_state::StateFlags::all()
                        & !tauri_plugin_window_state::StateFlags::VISIBLE,
                )
                .build(),
        )
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(interceptor::init())
        .setup(|app| {
            if cfg!(target_os = "macos") {
                #[cfg(target_os = "macos")]
                use mac::window::setup_mac_window;

                #[cfg(target_os = "macos")]
                setup_mac_window(app);
            } else if cfg!(target_os = "windows") {
                #[cfg(target_os = "windows")]
                use win::window::setup_win_window;

                #[cfg(target_os = "windows")]
                setup_win_window(app);
            }

            let handle = app.handle().clone();
            tauri_plugin_deep_link::register("hoppscotch", move |request| {
                println!("{:?}", request);
                handle.emit("scheme-request-received", request).unwrap();
            })
            .unwrap();

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
