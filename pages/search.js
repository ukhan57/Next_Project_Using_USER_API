import { useRouter } from "next/router";
import { Form, Row, Col, Button } from "react-bootstrap"
import { useForm } from "react-hook-form";


export default function AdvancedSearch(){
    const {register, handleSubmit, formState: {errors}} = useForm();
    const router = useRouter();

    function submitForm(data){
        let queryString = `${data.searchBy}=true`;

        if (data.geolocation) {
            queryString += `&geolocation=${data.geolocation}`;
        }

        if (data.medium) {
            queryString += `&medium=${data.medium}`
        }

        queryString += `&isOnView=${data.isOnView || false}`;
        queryString += `&isHighlight=${data.isHighlight || false}`;
        queryString += `&q=${data.q}`;

        router.push(`/artwork?${queryString}`);
    }
    return (
        <>
            <Form onSubmit={handleSubmit(submitForm)}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Search Query</Form.Label>
                            <Form.Control type="text" placeholder="" {...register('q', {required: true})} className={errors.q ? 'is-invalid' : ''} />
                            {errors.q && <div className="invalid-feedback">This field is required.</div>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Label>Search By</Form.Label>
                        <Form.Select {...register('searchBy')} className="mb-3">
                            <option value="title">Title</option>
                            <option value="tags">Tags</option>
                            <option value="artistOrCulture">Artist or Culture</option>
                        </Form.Select>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Geo Location</Form.Label>
                            <Form.Control type="text" placeholder="" {...register("geoLocation")} />
                            <Form.Text className="text-muted">
                                Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Medium</Form.Label>
                            <Form.Control type="text" placeholder="" {...register("medium")}/>
                            <Form.Text className="text-muted">
                                Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check
                            type="checkbox"
                            label="Highlighted"
                            {...register("isHighlight")}
                        />
                        <Form.Check
                            type="checkbox"
                            label="Currently on View"
                            {...register("isOnView")}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br />
                        <Button className="btn btn-dark" type="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}