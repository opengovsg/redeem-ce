import React from 'react'
import PropTypes from 'prop-types'

import campaignEmpty from 'img/campaign-empty.svg'
import './NoCampaignsCard.scss'

export default function NoCampaignsCard({ onClickCreateCampaign }) {
  return (
    <section className="no-campaign">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <img src={campaignEmpty} alt="" />
                <h1>Looks like you do not have a campaign.</h1>
                <p>Create your very first campaign and it will show up here.</p>
                <div className="btn-group">
                  <button
                    className="btn btn-primary btn-lg"
                    type="button"
                    onClick={onClickCreateCampaign}
                  >
                    Create a new Campaign
                  </button>

                  <button className="btn btn-link-primary btn-lg" type="button">
                    Need Help?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

NoCampaignsCard.propTypes = {
  onClickCreateCampaign: PropTypes.func.isRequired,
}
