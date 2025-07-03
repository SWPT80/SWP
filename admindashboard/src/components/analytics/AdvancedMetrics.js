import React from "react";
import { Card, Row, Col, Statistic } from "antd";

const AdvancedMetrics = ({ metrics }) => (
  <Row gutter={16}>
    <Col span={6}>
      <Card>
        <Statistic
          title="RevPAR"
          value={metrics.revpar}
          prefix="$"
          precision={2}
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card>
        <Statistic title="ADR" value={metrics.adr} prefix="$" />
      </Card>
    </Col>
    <Col span={6}>
      <Card>
        <Statistic
          title="Occupancy Rate"
          value={metrics.occupancyRate}
          suffix="%"
        />
      </Card>
    </Col>
    <Col span={6}>
      <Card>
        <Statistic title="CLV" value={metrics.clv} prefix="$" />
      </Card>
    </Col>
  </Row>
);
