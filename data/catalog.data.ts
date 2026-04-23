
// серии
const data = [
  {
    _id: "1", // угикальный id
    image: "https://sun9-85.userapi.com/s/v1/ig2/NGuWpR_TsLnXtbJkgyJak24kwZkNb63rA1g9rVBV_kkM4wojbh45cK5v2ooTqxPvPn06-QdDlfxSV82V3nDYOxBk.jpg?quality=95&as=32x71,48x107,72x160,108x240,160x356,240x533,360x800,480x1067,540x1200,640x1422,720x1600&from=bu&u=uNcFnP3V6TIQCNfYPXyeZJ7DbhWYcmX7anRV2xkRMJA&cs=640x0", // баннер для серии
    episodeTitle: "Ринговая серия" // название серии
  },
  {
    _id: "2",
    image: "https://sun9-51.userapi.com/s/v1/ig2/XKU_xIVvLpdBafNwlkZhxY1BtredghnUWGdRVmST3f1-a2RVfkV1K3WkBSlTRo8x2yHu3JO8hjr8h1iLhGnsyx61.jpg?quality=95&as=32x71,48x107,72x160,108x240,160x356,240x533,360x800,480x1067,540x1200,576x1280&from=bu&u=mrKNz6K_HPu5da5dPiBZrAv5La2anZ3ty4tmW-iW2ak&cs=576x0",
    episodeTitle: "Овальные рядные"
  },
  {
    _id: "3",
    image: "https://sun9-72.userapi.com/s/v1/ig2/5Pn6MWwcjWWlYL1b57sxhrAEFZkF1FP54lS-uffQ2Rbl_BtdJISxp6GQeRlaCZWM3SUKr797JzfwHPmt2vFZVOmY.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x214,240x321,360x481,480x641,540x721,640x855,720x962,958x1280&from=bu&u=y5MZrMLoWzFgXtN9hbSWgteq0yjVVqmkuWwkYCLjcwU&cs=640x0",
    episodeTitle: "Розетки с органзой"
  },
  {
    _id: "4",
    image: "https://sun9-82.userapi.com/s/v1/ig2/r3Ub1AFZBXmWcGMg4VWOgBonxGAGp8_SI5Pxp1gE-CekJQm3k0jUqghvkNvMgeH4vtvkTJqdktvQ_9mdQWMpc9bH.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,960x1280&from=bu&u=Ysmnadi9M6c7GzHv5CVUiE-sS2xfa8b9v1AD2-zByn0&cs=640x0",
    episodeTitle: "Розетки с капроном и кружевом"
  },
  {
    _id: "5",
    image: "https://sun9-70.userapi.com/s/v1/ig2/mwassD-MzvBD8cGuD-4_X0hpJl10UuD_SE-hkeWooY5yVTtiVYbHet07SH7491h2dVSNnYEOz94B9X9TN8czkO7Z.jpg?quality=95&as=32x43,48x64,72x96,108x143,160x213,240x319,360x478,480x638,540x717,640x850,720x957,1080x1435,1280x1700,1440x1913,1927x2560&from=bu&u=Ow81cDl-JTRV9y-fgeiIgCfCt_WeKhZ2lAStghM-9PE&cs=1080x0",
    episodeTitle: "Двухрядные розетки"
  },
  {
    _id: "6",
    image: "https://sun9-73.userapi.com/s/v1/ig2/a42K9GMWcbhoSOrc6k4dsiAbIQka1izrfQ1cDb1Sg0ZomrEbgCevr6biu4Dbm7BXbrbR3uLAWgev2OdmsjPgvMkp.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,1080x1440,1280x1707,1440x1920,1920x2560&from=bu&u=bDCpzEyUWFBnpvWbpWg6XNvQ2-Gg9OBNkNwFXGCvOxg&cs=640x0",
    episodeTitle: "Трёхрядные розетки"
  },
  {
    _id: "7",
    image: "https://sun9-22.userapi.com/s/v1/ig2/9vzh-W123rNiNx4UomOHIKoI8w1uC3gp-4l39sINEtTb3tHI-rmrMzh1RZ3-OcUnQng_P_OiE1wUVD7v2nVlnwpo.jpg?quality=95&as=32x18,48x27,72x41,108x61,160x90,240x135,360x203,480x270,540x304,640x360,720x405,1080x608,1280x721,1440x811,1600x901&from=bu&u=_wP-xmoD5YLOgeFTUF2eXgAVef5adE7QY9O7ideD4VY&cs=540x0",
    episodeTitle: "Ринговая серия ЁЖИК"
  },
  {
    _id: "8",
    image: "https://sun9-71.userapi.com/s/v1/ig2/0Pn6eWHRiJCRF9ISd9KLnve1ojvVZELTPGoeicgpk_ncLQW8nGmfCrDwFOLr2a7GXYFCkh5DVqeipNxliI8VqGqg.jpg?quality=95&as=32x57,48x85,72x128,108x191,160x283,240x425,360x638,480x850,540x957,640x1134,720x1276,1080x1913,1280x2268,1440x2551,1445x2560&from=bu&u=xK991yv9BQsEg54yS6EhY1nyY0MJn5Iv2BijFQGwa0o&cs=640x0",
    episodeTitle: "Титульная розетка PR101/1"
  }
]


// розетки с сериями
const rossets = [
  {
    // уникальный id
    _id: "1",
    image: "https://sun9-77.userapi.com/s/v1/ig2/O5kQpKcLUYNMh0fR7wbqBWCeczgrpucPVKXhh2SkEti5FGEOKd0bMRYg2bYdtSsHyyNarA2_WhqoEenIkOE-7s6M.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x214,240x321,360x482,480x642,540x722,640x856,720x963,1080x1445,1196x1600&from=bu&u=8opaSEeZIj_he2TroqxYD-TQa9nhGmgzf1KZmXkuc0s&cs=1080x0",
    // дополнительные картинки
    additionalImages: [
      "https://sun9-60.userapi.com/s/v1/ig2/xnp_WVeIxxPDSofwZb_VsYjPw9L-plw_onZI3ajMlSbpypjpPm49I1H8yf8PbcLLME21ltG2S-nBLIc4Muaxzd-X.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=Wy7fADUNOYhil9_5hwj9ObBZw2Izr6fc2FMJbS802GE&cs=540x0",
      "https://sun9-14.userapi.com/s/v1/ig2/ON4NtG07KSS8XhA5a9TNpxbCyUSDTUwBsEojfu36GeJHP-8_lzmZNF1vf0R-gB3VSwfUo2UwM4UpWVtxppOHFssz.jpg?quality=96&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,900x675&from=bu&u=JwVVi53HYnx6DYy9njr28qVvknUG41rvNsk4BB0h_Ls&cs=540x0",
      "https://sun9-77.userapi.com/s/v1/ig2/NvbPCj7naeL66sWfw1sNrgKB_lHw9pBKIj5Yt-mxE1swED3ROCPBjywQ3CtfrA9mxTPvUSjp2apl4FeS0BsKO6fX.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,675x900&from=bu&u=1-BCXumL5r-EQpy5eVZt0nk9SDo4_mGK700poVpZvuo&cs=640x0"
    ],
    // название серии
    episodeTitle: "Титульная розетка PR101/1",
    // номер серии
    seriesNumber: "ER_22/5",
    // серия розетки
    rossetSeries: "PR101",
    // номер розетки
    rossetNumber: 1,
    // диаметр розетки (см)
    rossetDiameter: 15, 
    // количество хвостов розетки
    numberOfTails: 5,
    // длина хвостов розетки (см)
    tailLength: 40,
    // комментарий к розетке (опционально)
    comment: "Легкая розетка с органзой и кружевом",
    // цена (руб)
    price: 1000
  }
]

export { data as catalog, rossets }