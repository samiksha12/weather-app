{/* <h2>Today's Highlight</h2>
        <div className="row p-2">
          <Card className={customClass}>
            <div className="d-flex flex-column justify-content-center text-center m-3">
              <div>UV Index</div>
              <div>
                <div
                  className="curve-bar"
                  style={{ "--value": uvIndex, "--fill": "#FF3D00" }}
                >
                  {uvIndex}
                </div>
              </div>
            </div>
          </Card>
          <Card className={customClass}>
            <div className="d-flex flex-column justify-content-center text-center m-3">
              <div>Wind</div>
              <div>
                <span className="wind-value">
                  {Math.round(todaysHighlightData.data.windSpeed)}
                </span>
                <span className="wind-unit">km/h</span>
              </div>
              <div>
                <Icon className="wind"></Icon>
                <span className="last-update px-1">
                  {getWindDirection(todaysHighlightData.data.winddirection)}
                </span>
              </div>
            </div>
          </Card>
          <Card className={customClass}>
            <div className="d-flex flex-column justify-content-center text-center m-3">
              <div>Sunrise & Sunset</div>
              <div className="d-flex justify-content-center align-items-center">
                <div className="sun-icon p-1">
                  <Icon className="sunrise-fill"></Icon>
                </div>
                <div className="px-2">{sunrise}</div>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <div className="sun-icon p-1">
                  <Icon className="sunset-fill"></Icon>
                </div>
                <div className="px-2">{sunset}</div>
              </div>
            </div>
          </Card>
          <Card className={customClass}>
            <div className="d-flex flex-column justify-content-center text-center m-3">
              <div>Humidity</div>
              <div>
                <span className="wind-value">{humidity}</span>
                <span className="wind-unit">%</span>
              </div>
              <div>
                <div className="d-flex flex-row justify-content-between align-items-end">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>

                <div
                  className="progress"
                  role="progressbar"
                  aria-label="Warning example"
                  aria-valuenow="84"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ height: 5 + "px" }}
                >
                  <div
                    className="progress-bar bg-warning"
                    style={{ width: `${humidity}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </Card>
          <Card className={customClass}>
            <div className="d-flex flex-column justify-content-center text-center m-3">
              <div>Visiblity</div>
              <div>
                <span className="wind-value">{visibilityMiles}</span>
                <span className="wind-unit">miles</span>
              </div>
              <span className="last-update">{visibility} meters</span>
            </div>
          </Card>
          <Card className={customClass}>
            <div className="d-flex flex-column justify-content-center text-center m-3">
              <div>Air Pressure</div>
              <div>
                <span className="wind-value">998</span>
                <span className="wind-unit">mb</span>
              </div>
            </div>
          </Card>
        </div> */}