import {
  Button,
  Col,
  Layout,
  Pagination,
  Row,
  Space,
} from "@douyinfe/semi-ui";
import { Card } from "@douyinfe/semi-ui";
import Meta from "@douyinfe/semi-ui/lib/es/card/meta";
import Sider from "@douyinfe/semi-ui/lib/es/layout/Sider";
import { useState, useEffect, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

import { getCompetitionList } from "../../../api/admin";

const { Content, Footer } = Layout;

const CardItem = (props: any) => {
  let navigate = useNavigate();
  const { id, name } = props.item;
  return (
    <Card
      shadows="hover"
      // style={{ height: 160 }}
      footerStyle={{ display: "flex", justifyContent: "flex-end" }}
      footer={
        <Space>
          <Button
            theme="borderless"
            type="primary"
            onClick={() => {
              // console.log(id);
              navigate(`/admin/${id}`);
            }}
          >
            More
          </Button>
        </Space>
      }
      bodyStyle={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Meta title={name} />
    </Card>
  );
};

export default function CompetitionList() {
  const PageSize = 6
  const [CompetitionList, setCompetitionList] = useState([]);
  const [Total, setTotal] = useState(0);
  const [PageNum, setPageNum] = useState(1);
  const onPageChange = (currentPage: SetStateAction<number>) => {
    setPageNum(currentPage);
    getCompetitionList(
      currentPage.toString(),
      PageSize.toString(),
      localStorage.getItem("token")
    )
      .then((res) => {
        //console.log(res.data);
        if (res.data.success === true) {
          // console.log(res.data.data.records);
          setCompetitionList(res.data.data.records);
          setTotal(res.data.data.total);
        } else {
          console.log(res.data.errMsg);
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  useEffect(() => {
    getCompetitionList("1", PageSize.toString(), localStorage.getItem("token"))
      .then((res) => {
        //console.log(res.data);
        if (res.data.success === true) {
          // console.log(res.data.data.records);
          setCompetitionList(res.data.data.records);
          setTotal(res.data.data.total);
        } else {
          console.log(res.data.errMsg);
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);
  return (
    <Layout>
      <Layout>
        <Sider
          style={{
            width: "40px",
          }}
        />
        <Content
          style={{
            padding: "48px",
            backgroundColor: "var(--semi-color-bg-0)",
            minHeight: "416px",
          }}
        >
          <Row gutter={[72, 48]}>
            {CompetitionList.length > 0 &&
              CompetitionList.map((item) => (
                <Col span={8}>
                  <CardItem item={item} />
                </Col>
              ))}
          </Row>
        </Content>
        <Sider
          style={{
            width: "40px",
          }}
        />
      </Layout>
      <Row type="flex" justify="center" align="middle">
        <Col>
          <Pagination
            showTotal
            total={Total}
            pageSize={PageSize}
            currentPage={PageNum}
            onPageChange={onPageChange}
            style={{
              marginBottom: 12,
              alignContent: "center",
            }}
          ></Pagination>
        </Col>
      </Row>
      <Footer></Footer>
    </Layout>
  );
}
